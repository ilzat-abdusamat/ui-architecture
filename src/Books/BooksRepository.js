import HttpGateway from '../Shared/HttpGateway.js';
import Observable from './Observable.js';

class BooksRepository {
  programmersModel = null;
  httpGateway = null;

  constructor() {
    this.httpGateway = new HttpGateway();
    this.programmersModel = new Observable([]);
  }

  getBooks = async (subscriber) => {
    await this.programmersModel.subscribe(subscriber);
    await this.loadApiData();
    this.programmersModel.print();
  };

  addBook = async (newBook) => {
    await this.httpGateway.post('/books', newBook);
  };

  loadApiData = async () => {
    this.programmersModel.value = await this.httpGateway.get('/books');
    this.programmersModel.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
