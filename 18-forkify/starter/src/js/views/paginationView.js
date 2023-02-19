import View from './View';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');
  prevBtn;
  nextBtn;

  render(page) {
    this.prevBtn.style.display = page?.prev ? 'inline' : 'none';
    this.nextBtn.style.display = page?.next ? 'inline' : 'none';
    this.prevBtn.dataset.page = page?.prev;
    this.nextBtn.dataset.page = page?.next;
    this.prevBtn.querySelector('span').innerHTML = `Page ${page?.prev}`;
    this.nextBtn.querySelector('span').innerHTML = `Page ${page?.next}`;
  }

  addPaginationHandler(handler) {
    this.parentElement.insertAdjacentHTML('beforeend', this.getMarkup());
    this.prevBtn = this.parentElement.querySelector('.pagination__btn--prev');
    this.nextBtn = this.parentElement.querySelector('.pagination__btn--next');
    this.render();
    [this.prevBtn, this.nextBtn].forEach(btn =>
      btn.addEventListener('click', function () {
        handler(this.dataset.page);
      })
    );
  }

  getMarkup() {
    return `
      <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${this.icons}#icon-arrow-left"></use>
      </svg>
      <span>Page </span>
      </button>;
      <button class="btn--inline pagination__btn--next">
      <span>Page </span>
      <svg class="search__icon">
        <use href="${this.icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
  }
}

export default new PaginationView();
