const express = require('express');
const booksController = require('./controllers/booksController');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Library REST API is running'
  });
});

app.get('/books', booksController.getAllBooks);
app.get('/books/:id', booksController.getBookById);
app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.deleteBook);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});