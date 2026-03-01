import { BookStorage } from "../services/BookStorage.js";

export class BookCard {
  constructor(book, onLibraryChange) {
    this.book = book;
    this.onLibraryChange = onLibraryChange;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add("catalogue-book-card");
    div.dataset.bookId = this.book.id;

    const isFavorite = BookStorage.has(this.book);

    div.innerHTML = `
      <button class="fav-btn ${isFavorite ? 'active' : ''}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org">
          <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" 
            stroke="#7C736A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="${this.book.cover_url}" alt="${this.book.title}">
      <div class="book-card-info">
        <h3 title="${this.book.title}">${this.book.title}</h3>
        <p>${this.book.author_name}</p>
        <span>${this.book.first_publish_year}</span>
      </div>
    `;

    const btn = div.querySelector('.fav-btn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (BookStorage.has(this.book)) {
        BookStorage.remove(this.book);
        btn.classList.remove('active');
      } else {
        BookStorage.add(this.book);
        btn.classList.add('active');
      }

      if (this.onLibraryChange) {
        this.onLibraryChange();
      }
    });

    return div;
  }
}
