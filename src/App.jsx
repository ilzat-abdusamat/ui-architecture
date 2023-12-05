import { useState, useEffect } from 'react';
import BooksPresenter from './Books/BooksPresenter';
import './styles.css';

export default function App() {
  const booksPresenter = new BooksPresenter();

  const [vm, copyVmToComponentState] = useState([]);

  const load = async () => {
    const generatedVm = await booksPresenter.load();
    copyVmToComponentState(generatedVm);
  };

  const addBook = () => {
    const sampleBook = {
      name: 'my private book',
      author: 'my private author',
    };
    booksPresenter.addBook(sampleBook);
  };

  useEffect(() => {
    load();
  });

  return (
    <div className='App'>
      {vm.map((bookVm, key) => {
        return <h2 key={key}>{bookVm.visibleName}</h2>;
      })}
      <button onClick={addBook}>Add a book</button>
    </div>
  );
}
