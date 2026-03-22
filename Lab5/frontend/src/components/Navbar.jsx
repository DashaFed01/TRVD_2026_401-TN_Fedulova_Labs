import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <Link to="/books" style={{ marginRight: '12px' }}>Книги</Link>
      <Link to="/create-book" style={{ marginRight: '12px' }}>Додати книгу</Link>

      {user ? (
        <>
          <span style={{ marginRight: '12px' }}>Користувач: {user.name}</span>
          <button onClick={handleLogout}>Вийти</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '12px' }}>Вхід</Link>
          <Link to="/register">Реєстрація</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;