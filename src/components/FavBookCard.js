export class FavBookCard {
  constructor(book, library, onLibraryChange) {
    this.book = book;
    this.library = library;
    this.onLibraryChange = onLibraryChange;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add("fav-book-card");

    div.innerHTML = `
      <img src="${this.book.cover_url}" alt="${this.book.title}">
      <div class="fav-book-info">
        <h4 title="${this.book.title}">${this.book.title}</h4>
        <p>${this.book.author_name}</p>
      </div>
      <button class="remove-fav-btn" aria-label="Remove">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    const btn = div.querySelector('.remove-fav-btn');
    btn.addEventListener('click', () => {
      const idToDelete = this.book.id;
      this.library.remove(this.book);
      this.onLibraryChange(idToDelete);
    });

    return div;
  }
}
