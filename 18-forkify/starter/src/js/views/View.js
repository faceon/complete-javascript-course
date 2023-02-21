import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  parentElement;
  icons = icons;
  errorMessage = '0 result';

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError(new Error(this.errorMessage));
    }
    const markup = this.getMarkup(data);
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  update(data) {
    const markup = this.getMarkup(data);

    // make a minimal document object of markup which has new info to render
    const newDOM = document.createRange().createContextualFragment(markup);

    // flatten nested objects of newDOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // flatten parentElements' sub nodes which have old info to update
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const curElement = curElements.at(i);
      // if newElement's textContent differs from curElement's, update the latter's
      if (
        !newElement.isEqualNode(curElement) && // if any changed
        newElement.firstChild?.nodeValue.trim() !== '' // if newElement has text data as firstChild
      ) {
        curElement.textContent = newElement.textContent;
      }

      // if newElement's attribute differs from curElement's, update the latter's
      if (!newElement.isEqualNode(curElement)) {
        Array.from(newElement.attributes).forEach(newAttribute => {
          curElement.setAttribute(newAttribute.name, newAttribute.value);
        });
      }
    });
  }

  getId() {
    return window.location.hash.slice(1);
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
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${this.icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${err.message}</p>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', errorMarkup);
  }
}
