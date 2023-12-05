import HttpGateway from '../Shared/HttpGateway.js';

class BooksRepository {
  constructor() {
    this.httpGateway = new HttpGateway();
  }

  getBooks = async () => {
    const response = await this.httpGateway.get(
      'https://api.logicroom.co/api/aa@logicroom.co/books'
    );
    const booksPm = response;
    return booksPm;
  };

  addBook = async (newBook) => {
    const response = await this.httpGateway.post(
      'https://api.logicroom.co/api/aa@logicroom.co/books',
      newBook
    );
    const booksPm = response.result;
    return booksPm;
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
