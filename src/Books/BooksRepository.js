import httpGateway from '../Shared/HttpGateway.js';
import Observable from './Observable.js';

class BooksRepository {
  programmersModel = null;
  mode = null;

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getBooks = async (subscriber) => {
    await this.programmersModel.subscribe(subscriber);
    await this.loadApiData();
  };

  addBook = async (newBook) => {
    await httpGateway.post('/books', newBook);
    await this.loadApiData();
  };

  deleteBook = async (index) => {
    await httpGateway.delete('/books', index);
    await this.loadApiData();
  };

  loadApiData = async () => {
    this.programmersModel.value = await httpGateway.get(this.mode);
    this.programmersModel.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
