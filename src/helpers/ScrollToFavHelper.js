import { BookStorage } from "../services/BookStorage.js";

export class ScrollToFavHelper {
  static init() {
    const btn = document.getElementById('scroll-to-fav');
    const favSection = document.getElementById('favorites');

    if (!btn || !favSection) return;

    btn.addEventListener('click', () => {
      favSection.scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      const favBox = favSection.getBoundingClientRect();

      const isFavHidden = favBox.top > window.innerHeight;

      const hasBooks = !BookStorage.isEmpty;

      if (isFavHidden && hasBooks) {
        btn.classList.remove('hidden');
      } else {
        btn.classList.add('hidden');
      }
    });
  }
}
