import { RecipeView } from './recipeView';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class SearchView extends RecipeView {
  #parentElement = document.querySelector('.results');
  #searchForm = document.querySelector('.search');

  render(searchResults) {
    this.#parentElement.innerHTML = '';
    searchResults.forEach(this.insertMarkup.bind(this));
  }

  insertMarkup(recipe) {
    const markup = this.#getMarkup(recipe);
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  #getMarkup(recipe) {
    const markup = `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;

    return markup;
  }
  addHandlerRender(handler) {
    this.#searchForm.addEventListener('submit', handler);
  }
}

export default new SearchView();
