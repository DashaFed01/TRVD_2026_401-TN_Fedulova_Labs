import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
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

    try {
      const data = await loginUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Увійти</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '12px' }}>
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
}

export default LoginPage;