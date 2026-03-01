import { BookCard } from "./BookCard.js";

export class CatalogueSection {
  constructor(containerId, onLibraryChange) {
    this.container = document.getElementById(containerId);
    this.onLibraryChange = onLibraryChange;
  }

  render(books) {
    const oldCards = this.container.querySelectorAll('.catalogue-book-card');
    oldCards.forEach(card => card.remove());

    if (!books || books.length === 0) return;

    books.forEach(book => {
      const bookCard = new BookCard(book, this.onLibraryChange);
      this.container.appendChild(bookCard.render());
    });
  }

  clear() {
    const cards = this.container.querySelectorAll('.catalogue-book-card');
    cards.forEach(card => card.remove());
  }

  updateHeartState(bookId, isFavorite) {
    const card = this.container.querySelector(`[data-book-id="${bookId}"]`);
    if (card) {
      const btn = card.querySelector('.fav-btn');
      btn.classList.toggle('active', isFavorite);
    }
  }
}
