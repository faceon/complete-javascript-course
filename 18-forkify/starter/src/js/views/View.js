import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  parentElement;
  icons = icons;
  errorMessage = 'We could not find the recipe you requested';

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    const markup = this.getMarkup(data);
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner() {
    this.clear();
    this.parentElement.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner">
        <svg>
          <use href="${this.icons}#icon-loader"></use>
        </svg>
      </div>`
    );
  }

  renderMessage(message) {
    const messageMarkup = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/${this.icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
          ${message}
        </p>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', messageMarkup);
  }

  renderError(err) {
    this.clear();
    const errorMessage = err?.message ?? this.errorMessage;
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${this.icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', errorMarkup);
  }
}
