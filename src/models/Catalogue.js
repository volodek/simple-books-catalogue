// a model for accessing the search of openlibrary api
class Catalogue {
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
    let books = data.docs;
    return books;
  }
}
