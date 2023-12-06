class HttpGateway {
  API = 'https://api.logicroom.co/api/hello@logicroom.co';

  booksData = [
    { id: 1, name: 'Book 1', author: 'Author 1' },
    { id: 2, name: 'Book 2', author: 'Author 2' },
  ];

  allBooksData = [
    { id: 1, name: 'Book 1', author: 'Author 1' },
    { id: 2, name: 'Book 2', author: 'Author 2' },
    { id: 3, name: 'Book 3', author: 'Author 3' },
  ];

  get = async (mode) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mode === 'books' ? this.booksData : this.allBooksData;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  post = async (mode, payload) => {
    try {
      const newBookId = this.booksData.length + 1;
      const newBook = {
        id: newBookId,
        name: payload.name,
        author: payload.author,
      };

      await new Promise((resolve) => setTimeout(resolve, 500));
      this.booksData.push(newBook);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  delete = async (url, index) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.booksData = this.booksData.filter((book, i) => i != index);
    } catch (error) {
      console.error('Error:', error);
    }
  };
}

const httpGateway = new HttpGateway();
export default httpGateway;
