export class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("library")) || [];
  }

  add(book) {
    if (this.has(book)) { return false };

    this.books.push(book);
    this._save();
    return true;
  }

  remove(book) {
    const initialLength = this.books.length;
    this.books = this.books.filter(item => item.id !== book.id);
    if (this.books.length == initialLength) { return false };

    this._save();
    return true;
  }

  has(book) {
    return this.books.some(item => item.id === book.id);
  }

  get allBooks() {
    return this.books;
  }

  get isEmpty() {
    return this.books.length === 0;
  }

  _save() {
    localStorage.setItem("library", JSON.stringify(this.books));
  }
}
