import booksRepository from './BooksRepository';

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name };
      });
      callback(booksVm);
    });
  };

  setMode = (path) => {
    booksRepository.mode = path === 'public' ? 'allBooks' : 'books';
  };

  addBook = async (sampleBook) => {
    await booksRepository.addBook(sampleBook);
  };
  deleteBook = async (index) => {
    await booksRepository.deleteBook(index);
  };
}
