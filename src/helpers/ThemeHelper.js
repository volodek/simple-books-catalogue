export class ThemeHelper {
  static #THEME_KEY = "user-theme";

  static init() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem(this.#THEME_KEY) || 'light';
    this.applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme);
    });
  }

  static applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(this.#THEME_KEY, theme);

    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (theme === 'dark') {
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
    } else {
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
    }
  }
}
