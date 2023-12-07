import { vitest } from 'vitest';
import BookListPresenter from '../Books/BookListPresenter';
import Observable from '../Shared/Observable';
import booksRepository from '../Books/BooksRepository';
import httpGateway from '../Shared/HttpGateway';
import AddBooksPresenter from '../Books/AddBooksPresenter';

export default class BookAdderTestHarness {
  booksStub = [
    {
      name: 'Testing Name',
      author: 'Testing Author',
    },
  ];

  init = async (callback) => {
    vitest.clearAllMocks();
    let bookListPresenter = new BookListPresenter();
    booksRepository.booksPm = new Observable([]);
    httpGateway.post = vitest.fn();

    httpGateway.get = vitest.fn().mockImplementation((path) => {
      return this.booksStub;
    });

    await bookListPresenter.load((vm) => {
      callback(vm);
    });
  };

  addBook = async (book) => {
    vitest.clearAllMocks();
    const addBooksPresenter = new AddBooksPresenter();
    this.booksStub.push(book);
    httpGateway.post = vitest.fn();

    httpGateway.get = vitest.fn().mockImplementation((path) => {
      return this.booksStub;
    });
    await addBooksPresenter.addBook(book.name, book.author);
  };
}
