import { describe } from 'vitest';
import { expect, it } from 'vitest';
import httpGateway from './Shared/HttpGateway';
import { vitest } from 'vitest';
import BooksPresenter from './Books/BooksPresenter';
import { beforeEach } from 'vitest';
import Observable from './Books/Observable';
import booksRepository from './Books/BooksPresenter';

describe('GET Books', () => {
  let booksStub = null;

  beforeEach(() => {
    booksRepository.programmersModel = new Observable([]);

    booksStub = [
      { name: 'test book 1', author: 'test author 1' },
      { name: 'test book 2', author: 'test author 2' },
    ];
  });

  httpGateway.get = vitest.fn().mockImplementation(() => {
    return booksStub;
  });

  httpGateway.post = vitest.fn().mockImplementation(() => {
    return booksStub;
  });

  it('should hit the correct backend API', async () => {
    let booksPresenter = new BooksPresenter();
    await booksPresenter.load(() => {});
    expect(httpGateway.get).toHaveBeenLastCalledWith('/books');
  });

  it('should load 2 books for viewModel', async () => {
    let viewModel = null;
    let booksPresenter = new BooksPresenter();
    await booksPresenter.load((vm) => {
      viewModel = vm;
    });
    expect(viewModel.length).toBe(2);
    expect(viewModel[0].displayName).toBe('test book 1');
    expect(viewModel[1].displayName).toBe('test book 2');
  });

  it('should add a new book and load the updated books into view model', async () => {
    let booksPresenter = new BooksPresenter();
    let viewModel = null;

    const newBook = {
      name: 'catty cat',
      author: 'ilzat',
    };

    booksStub.push(newBook);

    await booksPresenter.addBook(newBook);
    await booksPresenter.load((vm) => {
      viewModel = vm;
    });

    console.log(viewModel);

    expect(httpGateway.post).toHaveBeenLastCalledWith('/books', newBook);
    expect(viewModel.length).toBe(3);
  });
});
