class Book {
  constructor(title, author_name, first_publish_year, cover_i) {
    this.title = title;
    this.author_name = author_name.join(", ");
    this.first_publish_year = first_publish_year;
    this.cover_url = cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}.jpg`
      : "https://placehold.jp/180x380.png?text=no+cover";
  }
}
