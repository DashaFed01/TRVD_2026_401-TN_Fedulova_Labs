const cors = require('cors');
const express = require('express');
const booksController = require('./controllers/booksController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Library REST API with authentication is running'
  });
});

// Auth routes
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/profile', authMiddleware, authController.getProfile);

// Public routes
app.get('/books', booksController.getAllBooks);
app.get('/books/:id', booksController.getBookById);

// Authenticated routes
app.post('/books', authMiddleware, booksController.createBook);
app.put('/books/:id', authMiddleware, booksController.updateBook);

// Admin route
app.delete('/books/:id', authMiddleware, roleMiddleware('admin'), booksController.deleteBook);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});