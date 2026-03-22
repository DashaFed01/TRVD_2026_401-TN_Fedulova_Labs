class BookDTO {
  constructor(book) {
    this.id = book.id;
    this.title = book.title;
    this.author = book.author;
    this.year = book.year;
    this.category = book.category;
    this.available = book.available;
  }
}

module.exports = BookDTO;