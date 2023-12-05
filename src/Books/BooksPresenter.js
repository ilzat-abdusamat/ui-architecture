import booksRepository from './BooksRepository';

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { displayName: bookPm.name };
      });
      callback(booksVm);
    });
  };

  addBook = async (sampleBook) => {
    await booksRepository.addBook(sampleBook);
  };
  deleteBook = async (index) => {
    await booksRepository.deleteBook(index);
  };
}
