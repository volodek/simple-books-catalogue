import { Catalogue } from "./models/Catalogue.js";
import { Library } from "./models/Library.js";
import { BookCard } from "./components/BookCard.js";
import { CatalogueSection } from "./components/CatalogueSection.js";
import { FavoritesSection } from "./components/FavoritesSection.js";

export class App {
  constructor() {
    this.searchModel = new Catalogue();
    this.library = new Library();
    this.favoritesSection = new FavoritesSection("favorites", this.library, (removedBookId) => {
      this.favoritesSection.render();

      this.catalogueSection.updateHeartState(removedBookId, false);
    });


    this.catalogueSection = new CatalogueSection(
      "search-results",
      this.library,
      () => { this.favoritesSection.render(); }
    );

    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");

    this.loader = document.getElementById("loader");
    this.errorContainer = document.getElementById("error-container");

    this.init();
  }

  init() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
    this.favoritesSection.render();
  }

  async handleSearch() {
    const keywords = this.searchInput.value.trim();
    if (!keywords) return;

    this.prepareForSearch();

    try {
      const books = await this.searchModel.findBooks(keywords);
      this.catalogueSection.render(books);
    } catch (error) {
      console.error("Search failed: ", error);
      this.showErrorMessage(`Something went wrong, check your network connection and try again later`);
    }

    this.hideLoader();
  }

  prepareForSearch() {
    this.clearError();

    this.catalogueSection.clear();

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
}
