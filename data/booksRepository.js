let books = [
  {
    id: 1,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J. K. Rowling',
    year: 1997,
    category: 'Fantasy',
    available: true
  },
  {
    id: 2,
    title: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    year: 1954,
    category: 'Fantasy',
    available: true
  },
  {
    id: 3,
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    year: 1892,
    category: 'Detective',
    available: false
  }
];

function findAll() {
  return books;
}

function findById(id) {
  return books.find(book => book.id === id);
}

function create(bookData) {
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title: bookData.title,
    author: bookData.author,
    year: bookData.year,
    category: bookData.category,
    available: bookData.available
  };

  books.push(newBook);
  return newBook;
}

function update(id, updatedData) {
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return null;
  }

  books[index] = {
    ...books[index],
    ...updatedData,
    id: id
  };

  return books[index];
}

function remove(id) {
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return false;
  }

  books.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};