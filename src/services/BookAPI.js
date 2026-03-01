import { Book } from "../models/Book.js";

export class BookAPI {
  // to show only first 10 books as the most relevant result
  static #PAGE = 1;
  static #LIMIT = 10;
  static #BASE_URL = "https://openlibrary.org";

  static async findBooks(keywords) {
    let search_params = new URLSearchParams(
      { q: keywords, page: this.#PAGE, limit: this.#LIMIT }
    );
    let response = await fetch(`${this.#BASE_URL}/search.json?${search_params.toString()}`);
    if (!response.ok) { throw new Error(`Error: ${response.status}`) };

    let data = await response.json();
    let books = data.docs.map(
      doc => { return new Book(doc.key, doc.title, doc.author_name, doc.first_publish_year, doc.cover_i); }
    );
    return books;
  }
}
