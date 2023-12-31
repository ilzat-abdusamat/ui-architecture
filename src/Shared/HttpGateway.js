class HttpGateway {
  API = 'https://api.logicroom.co/api/hello@logicroom.co';

  booksData = [
    { id: 1, name: 'Book 1', author: 'Author 1' },
    { id: 2, name: 'Book 2', author: 'Author 2' },
  ];

  get = async (path) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return this.booksData;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  post = async (path, payload) => {
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
}

const httpGateway = new HttpGateway();
export default httpGateway;
