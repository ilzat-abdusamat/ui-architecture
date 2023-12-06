import { describe } from 'vitest';
import { expect, it } from 'vitest';
import httpGateway from './Shared/HttpGateway';
import { vitest } from 'vitest';
import BooksPresenter from './Books/BooksPresenter';
import { beforeEach } from 'vitest';
import Observable from './Books/Observable';
import booksRepository from './Books/BooksPresenter';

let viewModel;
let booksPresenter;
let booksStub;
let allBooksStub;

describe('Books', () => {
  beforeEach(() => {
    booksRepository.programmersModel = new Observable([]);
    booksPresenter = new BooksPresenter();
    viewModel = null;

    booksStub = [
      { name: 'Private TEST Book 1', author: 'Author 1' },
      { name: 'Private TEST Book 2', author: 'Author 2' },
    ];

    allBooksStub = [
      { name: 'Public TEST Book 1', author: 'Author 1' },
      { name: 'Public TEST Book 2', author: 'Author 2' },
      { name: 'Public TEST Book 3', author: 'Author 3' },
    ];

    httpGateway.get = vitest.fn().mockImplementation((path) => {
      console.log('PATH', path);
      return path === 'books' ? booksStub : allBooksStub;
    });
  });

  const setup = async (mode) => {
    booksPresenter.setMode(mode);
    await booksPresenter.load((vm) => {
      viewModel = vm;
    });
  };

  it.skip('should load public books', async () => {
    await setup('public');
    expect(httpGateway.get).toHaveBeenCalledWith('allBooks');
    expect(viewModel.length).toBe(3);
    expect(viewModel[0].name).toBe('Public TEST Book 1');
  });

  it.skip('should load private books', async () => {
    await setup('private');
    expect(httpGateway.get).toHaveBeenCalledWith('books');
    expect(viewModel.length).toBe(2);
    expect(viewModel[0].name).toBe('Private TEST Book 1');
  });

  it('should load private books by default if no arg given', async () => {
    await setup();
    expect(httpGateway.get).toHaveBeenCalledWith('books');
    expect(viewModel.length).toBe(2);
    expect(viewModel[0].name).toBe('Private TEST Book 1');
  });
});
