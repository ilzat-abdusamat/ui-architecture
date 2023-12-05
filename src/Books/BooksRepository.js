import httpGateway from '../Shared/HttpGateway.js';
import Observable from './Observable.js';

class BooksRepository {
  programmersModel = null;

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (subscriber) => {
    await this.programmersModel.subscribe(subscriber);
    await this.loadApiData();
  };

  addBook = async (newBook) => {
    await httpGateway.post('/books', newBook);
  };

  loadApiData = async () => {
    this.programmersModel.value = await httpGateway.get('/books');
    this.programmersModel.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
