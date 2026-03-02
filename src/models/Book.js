export class Book {
  constructor(key, title, author_name, first_publish_year, cover_i) {
    this.id = key;
    this.title = title;
    this.author_name = author_name?.join(", ") ?? "Unknown author";
    this.first_publish_year = first_publish_year || "N/A";
    this.cover_url = cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}.jpg`
      : "https://placehold.jp/180x300.png?text=no+cover";
  }
}
