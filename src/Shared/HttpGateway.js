export default class HttpGateway {
  apiUrl = 'https://api.logicroom.co/api/pete@logicroom.co/';

  // get = async (url) => {
  //   const response = await fetch(this.apiUrl + url);
  //   const dto = response.json();
  //   return dto;
  // };
  get = async (url) => {
    let booksData = [
      { id: 1, name: 'Book 1', author: 'Author 1' },
      { id: 2, name: 'Book 2', author: 'Author 2' },
    ];

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return booksData;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  post = async (url, data) => {
    await fetch(this.apiUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
}
