import View from './View';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');

  addPaginationHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      // if clicked target is not btn, return
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // if so, call handler with page to go parameter
      handler(btn.dataset.page);
    });
  }

  getMarkup(page) {
    // build button markups depending on page values
    const prevBtn = page.prev
      ? `
      <button class="btn--inline pagination__btn--prev" data-page=${page.prev}>
      <svg class="search__icon">
      <use href="${this.icons}#icon-arrow-left"></use>
      </ svg>
      <span>Page ${page.prev}</span>
      </button>`
      : '';

    const nextBtn = page.next
      ? `
      <button class="btn--inline pagination__btn--next" data-page=${page.next}>
      <span>Page ${page.next}</span>
      <svg class="search__icon">
      <use href="${this.icons}#icon-arrow-right"></use>
      </svg>
      </button>`
      : '';

    return prevBtn + nextBtn;
  }
}

export default new PaginationView();
