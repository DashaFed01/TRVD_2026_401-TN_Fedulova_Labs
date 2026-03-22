const booksRepository = require('../data/booksRepository');
const BookDTO = require('../dto/bookDto');

function getAllBooks() {
  const books = booksRepository.findAll();
  return books.map(book => new BookDTO(book));
}

function getBookById(id) {
  const book = booksRepository.findById(id);

  if (!book) {
    return null;
  }

  return new BookDTO(book);
}

function createBook(bookData) {
  if (
    !bookData.title ||
    !bookData.author ||
    !bookData.year ||
    !bookData.category ||
    typeof bookData.available !== 'boolean'
  ) {
    return {
      error: 'All fields are required: title, author, year, category, available'
    };
  }

  const newBook = booksRepository.create(bookData);
  return new BookDTO(newBook);
}

function updateBook(id, bookData) {
  const existingBook = booksRepository.findById(id);

  if (!existingBook) {
    return null;
  }

  const updatedBook = booksRepository.update(id, bookData);
  return new BookDTO(updatedBook);
}

function deleteBook(id) {
  return booksRepository.remove(id);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};