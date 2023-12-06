import { useState, useEffect } from 'react';
import BooksPresenter from './Books/BooksPresenter';

export default function App() {
  const booksPresenter = new BooksPresenter();
  const [vm, copyVmToComponentState] = useState([]);

  const load = async () => {
    await booksPresenter.load((generatedVm) => {
      copyVmToComponentState(generatedVm);
    });
  };

  const addBook = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newBook = {
      name: data.get('name'),
      authro: data.get('author'),
    };
    booksPresenter.addBook(newBook);
    load();
  };

  const deleteBook = (key) => {
    console.log(key);
    booksPresenter.deleteBook(key);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className='App'>
      {vm.map((bookVm, key) => {
        return (
          <h2 key={key}>
            {bookVm.name}
            <button onClick={() => deleteBook(key)}>delete</button>
          </h2>
        );
      })}

      <form onSubmit={addBook}>
        <input
          type='text'
          placeholder='name'
          name='name'
          id=''
        />
        <input
          type='text'
          placeholder='author'
          name='author'
          id=''
        />
        <button>Add a book</button>
      </form>
    </div>
  );
}
