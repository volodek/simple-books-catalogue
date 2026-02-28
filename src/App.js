import { Catalogue } from "./models/Catalogue.js";

export class App {
  constructor() {
    this.catalogue = new Catalogue();

    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");
    this.searchResults = document.getElementById("search-results");

    this.loader = document.getElementById("loader");
    this.errorContainer = document.getElementById("error-container");

    this.init();
  }

  init() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
  }

  async handleSearch() {
    const keywords = this.searchInput.value.trim();
    if (!keywords) return;

    this.prepareForSearch();

    try {
      const books = await this.catalogue.findBooks(keywords);
      this.renderBooks(books);
    } catch (error) {
      console.error("Search failed: ", error);
      this.showErrorMessage(`Something went wrong, check your network connection and try again later`);
    }

    this.hideLoader();
  }

  prepareForSearch() {
    this.clearError();

    const cards = this.searchResults.querySelectorAll('.catalogue-book-card');
    cards.forEach(card => card.remove());

    this.showLoader();
  }

  showLoader() {
    this.loader.classList.remove("hidden");
  }

  hideLoader() {
    this.loader.classList.add("hidden");
  }

  showErrorMessage(message) {
    this.hideLoader();
    this.errorContainer.textContent = message;
    this.errorContainer.classList.remove("hidden");
  }

  clearError() {
    this.errorContainer.classList.add('hidden');
    this.errorContainer.textContent = '';
  }

  renderBooks(books) {
    if (!books || books.length === 0) {
      this.showErrorMessage("Nothing was found");
      return;
    }

    console.log(books);
    books.forEach(book => {
      const bookElement = this.createBookElement(book);
      this.searchResults.appendChild(bookElement);
    });
  }

  createBookElement(book) {
    const div = document.createElement('div');
    div.classList.add("catalogue-book-card");

    div.innerHTML = `
      <img src="${book.cover_url}" alt="${book.title}">
      <div class="book-card-info">
        <h3 title="${book.title}">${book.title}</h3>
        <p>${book.author_name}</p>
        <span>${book.first_publish_year}</span>
      </div>
    `;

    return div;
  }
}
