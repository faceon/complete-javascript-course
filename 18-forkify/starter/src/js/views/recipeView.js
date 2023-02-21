import View from './View';
import { Fraction } from 'fractional';

class RecipeView extends View {
  parentElement = document.querySelector('.recipe');

  getMarkup(data) {
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
          <use href="${this.icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${this.icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          data.newServings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings" data-change="-1">
            <svg>
              <use href="${this.icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings" data-change="1">
            <svg>
              <use href="${this.icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        <svg>
          <use href="${this.icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${this.icons}#icon-bookmark-fill"></use>
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
                  <use href="${this.icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  entry.quantity
                    ? new Fraction(
                        (entry.quantity * data.newServings) / data.servings
                      ).toString()
                    : ''
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
          <use href="${this.icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }

  addRenderHandler(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addServingsHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      // is serving btn clicked?
      const servingsBtn = e.target.closest('.btn--increase-servings');
      if (!servingsBtn) return;

      // if true, call handler
      handler(servingsBtn.dataset.change);
    });
  }
}

export default new RecipeView();
