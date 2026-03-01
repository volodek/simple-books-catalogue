export class Library {
  static #STORAGE_KEY = "library";

  static books = JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) || [];

  static add(book) {
    if (this.has(book)) { return false };

    this.books.push(book);
    this._save();
    return true;
  }

  static remove(book) {
    const initialLength = this.books.length;
    this.books = this.books.filter(item => item.id !== book.id);
    if (this.books.length == initialLength) { return false };

    this._save();
    return true;
  }

  static has(book) {
    return this.books.some(item => item.id === book.id);
  }

  static get allBooks() {
    return this.books;
  }

  static get isEmpty() {
    return this.books.length === 0;
  }

  static _save() {
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(this.books));
  }
}
