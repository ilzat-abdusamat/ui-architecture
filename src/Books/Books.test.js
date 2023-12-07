import { describe, it } from 'vitest';
import httpGateway from '../Shared/HttpGateway';
import { expect } from 'vitest';
import BookAdderTestHarness from '../TestTools/BookAdderTestHarness';

describe('add book', () => {
  it('should call api', async () => {
    const bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init((vm) => {});
    await bookAdderTestHarness.addBook({ name: 'learn js', author: 'ilzat' });

    expect(httpGateway.post).toHaveBeenCalledWith('/books', {
      name: 'learn js',
      author: 'ilzat',
    });
  });

  it('should load and reload books', async () => {
    const bookAdderTestHarness = new BookAdderTestHarness();
    let viewModel = null;

    await bookAdderTestHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    expect(viewModel.length).toBe(1);
    expect(viewModel[0].name).toBe('Testing Name');

    await bookAdderTestHarness.addBook({ name: 'learn js', author: 'ilzat' });

    expect(httpGateway.post).toHaveBeenCalledWith('/books', {
      name: 'learn js',
      author: 'ilzat',
    });

    expect(viewModel.length).toBe(2);
    expect(viewModel[1].name).toBe('learn js');
  });
});
