import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів');
      return;
    }

    try {
      await registerUser(form);
      setMessage('Реєстрація успішна');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ім’я"
          value={form.name}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '10px' }}
        />
        <button type="submit">Зареєструватися</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '12px' }}>
        Уже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;