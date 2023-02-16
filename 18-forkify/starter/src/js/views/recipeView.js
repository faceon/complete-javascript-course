import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

export class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #errorMessages = {
    default: 'Sorry, something went wrong',
    400: 'We could not find that recipe. Please try another one.',
    504: 'Getting the recipe took too long. Please try again.',
  };
  constructor() {}

  render(data) {
    const markup = this.#getMarkup(data);
    this.#clear();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`
    );
  }

  #getMarkup(data) {
    return `
    <figure class="recipe__fig">
      <img src="${data.imgSrc}" alt="${data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${data.title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${data.icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          data.servings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${data.ingredients
          .map(
            entry =>
              `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  entry.quantity ? new Fraction(entry.quantity).toString() : ''
                }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${entry.unit ?? ''}</span>
                  ${entry.description}
                </div>
              </li>`
          )
          .join('')}
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  renderError(err) {
    const errorMessage =
      this.#errorMessages[err.cause] ?? this.#errorMessages.default;
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('beforeend', errorMarkup);
  }

  renderMessage(message) {
    const messageMarkup = `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          ${message}
        </p>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('beforeend', messageMarkup);
  }
}

export default new RecipeView();
