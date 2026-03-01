export class BookCard {
  constructor(book) {
    this.book = book;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add("catalogue-book-card");

    div.innerHTML = `
      <img src="${this.book.cover_url}" alt="${this.book.title}">
      <div class="book-card-info">
        <h3 title="${this.book.title}">${this.book.title}</h3>
        <p>${this.book.author_name}</p>
        <span>${this.book.first_publish_year}</span>
      </div>
    `;

    return div;
  }
}
