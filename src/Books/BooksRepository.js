import httpGateway from '../Shared/HttpGateway';
import Observable from '../Shared/Observable';

class BooksRepository {
  booksPm = null;
  lastAddedBookPm = null;
  mode = 'books';

  constructor() {
    this.booksPm = new Observable([]);
    this.lastAddedBookPm = new Observable('');
  }

  getBooks = async (callback) => {
    this.booksPm.subscribe(callback);
    if (this.booksPm.value.length === 0) {
      console.log(this.booksPm.value.length === 0);
      await this.loadApiData();
    } else {
      this.refreshModelData();
    }
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
    };
    await httpGateway.post('/books', dto);
    await this.loadApiData();
    this.lastAddedBookPm.value = programmersModel.name;
  };

  getLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  loadApiData = async () => {
    const dto = await httpGateway.get('/books');
    this.booksPm.value = dto.map((dtoItem) => {
      return dtoItem;
    });
  };

  refreshModelData = () => {
    this.booksPm.value = this.booksPm.value.map((pm) => {
      return pm;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
