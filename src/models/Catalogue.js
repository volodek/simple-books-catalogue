import { Book } from "./Book.js";

// a model for accessing the search of openlibrary api
export class Catalogue {
  constructor() {
    this.base_url = "https://openlibrary.org";
    // to show only first 20 books as the most relevant result
    this.page = 1;
    this.limit = 20;
  }

  async findBooks(keywords) {
    let search_params = new URLSearchParams({ q: keywords, page: this.page, limit: this.limit });
    let response = await fetch(`${this.base_url}/search.json?${search_params.toString()}`);
    if (!response.ok) { throw new Error(`Error: ${response.status}`) };

    let data = await response.json();
    let books = data.docs.map(
      doc => { return new Book(doc.key, doc.title, doc.author_name, doc.first_publish_year, doc.cover_i); }
    );
    return books;
  }

  async getTrendingBooks() {
    // TODO: Refactoring!!
    let trending_books_url = "https://openlibrary.org/search.json?q=trending_score_hourly_sum:[1%20TO%20*]%20readinglog_count:[4%20TO%20*]%20language:eng%20-subject:%22content_warning:cover%22%20-subject:%22content_warning:cover%22&sort=trending&limit=10"
    let response = await fetch(trending_books_url);
    if (!response.ok) { throw new Error(`Error: ${response.status}`) };

    let data = await response.json();
    let books = data.docs.map(
      doc => { return new Book(doc.key, doc.title, doc.author_name, doc.first_publish_year, doc.cover_i); }
    );
    return books;
  }
}
