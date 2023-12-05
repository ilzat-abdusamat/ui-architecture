export default class Observable {
  _value = null;
  observers = [];

  constructor(initialValue) {
    this._value = initialValue;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  subscribe = (observer) => {
    this.observers.push(observer);
  };

  notify = () => {
    this.observers.map((observer) => {
      observer(this._value);
    });
  };
}
