export class UIManager {
  constructor() {
    this.loader = document.getElementById("loader");
    this.errorContainer = document.getElementById("error-container");
    this.catalogueContainer = document.getElementById("search-results");
  }

  showLoader() {
    this.clearError();
    this.loader?.classList.remove("hidden");
  }

  hideLoader() {
    this.loader?.classList.add("hidden");
  }

  showError(message) {
    this.hideLoader();
    if (this.errorContainer) {
      this.errorContainer.textContent = message;
      this.errorContainer.classList.remove("hidden");
    }
  }

  clearError() {
    if (this.errorContainer) {
      this.errorContainer.classList.add('hidden');
      this.errorContainer.textContent = '';
    }
  }

  prepareUI() {
    this.clearError();
    this.showLoader();
  }
}
