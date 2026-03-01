import { BookAPI } from "./models/BookAPI.js";
import { FavoritesSection } from "./components/FavoritesSection.js";
import { CatalogueSection } from "./components/CatalogueSection.js";
import { UIManager } from "./services/UIManager.js";

export class App {
  constructor() {
    this.ui = new UIManager();

    this.favoritesSection = new FavoritesSection("favorites", (removedBookId) => {
      this.favoritesSection.render();
      this.catalogueSection.updateHeartState(removedBookId, false);
    });

    this.catalogueSection = new CatalogueSection(
      "search-results",
      () => { this.favoritesSection.render(); }
    );

    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-button");

    this.init();
  }

  init() {
    this.searchButton.addEventListener('click', () => this.handleSearch());
    this.favoritesSection.render();
  }

  async handleSearch() {
    const keywords = this.searchInput.value.trim();
    if (!keywords) return;

    this.ui.prepareUI();
    this.catalogueSection.clear();

    try {
      const books = await BookAPI.findBooks(keywords);
      this.catalogueSection.render(books);
    } catch (error) {
      console.error("Search failed: ", error);
      this.ui.showError("Something went wrong, check your network connection and try again later.");
    } finally {
      this.ui.hideLoader();
    }
  }
}
