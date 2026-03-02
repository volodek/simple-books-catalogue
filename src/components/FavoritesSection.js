import { FavBookCard } from "./FavBookCard.js";
import { BookStorage } from "../services/BookStorage.js";

export class FavoritesSection {
  constructor(containerId, onLibraryChange) {
    this.container = document.getElementById(containerId);
    this.onLibraryChange = onLibraryChange;

    this.filterInput = document.createElement('input');
    this.filterInput.placeholder = "Filter by author...";
    this.filterInput.classList.add('fav-filter-input', 'hidden');

    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('fav-list');

    this.container.appendChild(this.filterInput);
    this.container.appendChild(this.listContainer);

    this.#initEvents();
  }

  #initEvents() {
    this.filterInput.addEventListener('input', () => this.render());
  }

  #getFilteredBooks() {
    const books = BookStorage.allBooks;
    const query = this.filterInput.value.toLowerCase().trim();

    if (!query) return books;

    return books.filter(book =>
      book.author_name.toLowerCase().includes(query)
    );
  }

  render() {
    const allBooks = BookStorage.allBooks;

    if (allBooks.length > 0) {
      this.filterInput.classList.remove('hidden');
    } else {
      this.filterInput.classList.add('hidden');
      this.filterInput.value = '';
    }

    this.listContainer.innerHTML = '';
    const filtered = this.#getFilteredBooks();

    if (allBooks.length == 0) {
      this.listContainer.innerHTML = '<p>No favorites yet</p>';
      return;
    }

    if (filtered.length == 0) {
      this.listContainer.innerHTML = '<p>No authors match your filter</p>';
      return;
    }

    filtered.forEach(book => {
      const favCard = new FavBookCard(book, (removedId) => {
        this.render();
        if (this.onLibraryChange) this.onLibraryChange(removedId);
      });
      this.listContainer.appendChild(favCard.render());
    });
  }
}
