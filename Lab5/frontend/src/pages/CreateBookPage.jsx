import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/booksService';
import Navbar from '../components/Navbar';

function CreateBookPage() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    year: '',
    category: '',
    available: true
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await createBook({
        ...form,
        year: Number(form.year)
      });
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.error || 'Помилка створення');
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Додати книгу</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Назва"
            value={form.title}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
          />
          <input
            type="text"
            name="author"
            placeholder="Автор"
            value={form.author}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
          />
          <input
            type="number"
            name="year"
            placeholder="Рік"
            value={form.year}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
          />
          <input
            type="text"
            name="category"
            placeholder="Категорія"
            value={form.category}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
          />
          <label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Доступна
          </label>
          <br /><br />
          <button type="submit">Створити</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default CreateBookPage;