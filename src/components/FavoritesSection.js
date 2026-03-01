import { FavBookCard } from "./FavBookCard.js";
import { Library } from "../models/Library.js";

export class FavoritesSection {
  constructor(containerId, onLibraryChange) {
    this.container = document.getElementById(containerId);
    this.onLibraryChange = onLibraryChange;
  }

  render() {
    const title = this.container.querySelector('h2');
    this.container.innerHTML = '';
    if (title) this.container.appendChild(title);

    if (Library.isEmpty) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = "No favorites yet";
      emptyMsg.classList.add('empty-fav-msg');
      this.container.appendChild(emptyMsg);
      return;
    }

    const books = Library.allBooks;

    books.forEach(book => {
      const favCard = new FavBookCard(book, (removedId) => {
        this.render();
        if (this.onLibraryChange) {
          this.onLibraryChange(removedId);
        }
      });
      this.container.appendChild(favCard.render());
    });
  }
}
