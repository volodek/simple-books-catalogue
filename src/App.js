import { Catalogue } from "./models/Catalogue.js";
import { BookCard } from "./components/BookCard.js";

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
      const bookCard = new BookCard(book);
      this.searchResults.appendChild(bookCard.render());
    });
  }
}
