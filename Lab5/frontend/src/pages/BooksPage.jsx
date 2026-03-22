import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/booksService';
import Navbar from '../components/Navbar';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('Не вдалося завантажити книги');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Ви впевнені?')) {
      return;
    }

    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      setError(err.response?.data?.error || 'Помилка видалення');
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Список книг</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Автор</th>
              <th>Рік</th>
              <th>Категорія</th>
              <th>Доступна</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.category}</td>
                <td>{book.available ? 'Так' : 'Ні'}</td>
                <td>
                  <button onClick={() => handleDelete(book.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BooksPage;