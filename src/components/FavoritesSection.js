import { FavBookCard } from "./FavBookCard.js";

export class FavoritesSection {
  constructor(containerId, library, onLibraryChange) {
    this.container = document.getElementById(containerId);
    this.library = library;
    this.onLibraryChange = onLibraryChange;
  }

  render() {
    const title = this.container.querySelector('h2');
    this.container.innerHTML = '';
    if (title) this.container.appendChild(title);

    const books = this.library.allBooks;

    if (this.library.isEmpty) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = "No favorites yet";
      emptyMsg.classList.add('empty-fav-msg');
      this.container.appendChild(emptyMsg);
      return;
    }

    books.forEach(book => {
      const favCard = new FavBookCard(book, this.library, (removedId) => {
        this.render();
        if (this.onLibraryChange) {
          this.onLibraryChange(removedId);
        }
      });
      this.container.appendChild(favCard.render());
    });
  }
}
