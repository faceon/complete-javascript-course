import View from './View';

class ResultsView extends View {
  parentElement = document.querySelector('.results');

  getMarkup(data) {
    const previewMarkup = recipe => `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imgSrc}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${this.icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
    let markup = '';
    for (let i = 0; i < data.length; i++) {
      const recipe = data.at(i);
      markup += previewMarkup(recipe);
    }
    return markup;
  }
}

export default new ResultsView();
