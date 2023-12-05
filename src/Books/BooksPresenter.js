import booksRepository from './BooksRepository';

export default class BooksPresenter {
  load = async () => {
    const booksPm = await booksRepository.getBooks();
    const booksVm = booksPm.map((pmBook) => {
      return {
        visibleName: pmBook.name,
      };
    });
    return booksVm;
  };

  addBook = async (newBook) => {
    await booksRepository.addBook(newBook);
  };
}
