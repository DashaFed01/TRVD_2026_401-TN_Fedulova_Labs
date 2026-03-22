const booksService = require('../services/booksService');

function getAllBooks(req, res) {
  const books = booksService.getAllBooks();
  res.json(books);
}

function getBookById(req, res) {
  const id = parseInt(req.params.id, 10);
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      error: 'Book not found'
    });
  }

  res.json(book);
}

function createBook(req, res) {
  const result = booksService.createBook(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error
    });
  }

  res.status(201).json(result);
}

function updateBook(req, res) {
  const id = parseInt(req.params.id, 10);
  const updatedBook = booksService.updateBook(id, req.body);

  if (!updatedBook) {
    return res.status(404).json({
      error: 'Book not found'
    });
  }

  res.json(updatedBook);
}

function deleteBook(req, res) {
  const id = parseInt(req.params.id, 10);
  const deleted = booksService.deleteBook(id);

  if (!deleted) {
    return res.status(404).json({
      error: 'Book not found'
    });
  }

  res.json({
    message: 'Book deleted successfully'
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};