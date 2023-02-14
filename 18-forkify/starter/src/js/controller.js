import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

////////////////////////////////////////////////////////
// constants
// https://forkify-api.herokuapp.com/v2
const recipeTest = `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`;
const recipeUrl = recipeId =>
  `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`;

////////////////////////////////////////////////////////
// helper functions
// spinner graphic to show while fetching
const renderSpinner = function (parentEl) {
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML(
    'afterbegin',
    `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`
  );
};

// wait function to test spinner
const wait = function (sec) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, sec * 1000);
  });
};

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = this.location.hash.slice(1);
    if (!id) return;
    const url = recipeUrl(id);

    // show a spinner while retrieving data
    renderSpinner(recipeContainer);
    const res = await fetch(url);
    // const waited = await wait(1);
    const data = await res.json();

    // response error handling
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // recipe variables
    console.log(data.data, res);
    const {
      cooking_time: cookingTime,
      image_url: imgSrc,
      source_url: sourceUrl,
      servings,
      title,
      publisher,
      ingredients,
    } = data.data.recipe;
    console.log(`${title} for ${servings} persons in ${cookingTime} minutes`);

    // recipe details
    const recipeDiv = `
      <figure class="recipe__fig">
        <img src="${imgSrc}" alt="${title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
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
          ${ingredients
            .map(
              entry =>
                `<li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${entry.quantity ?? ''}</div>
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
          <span class="recipe__publisher">${publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('beforeend', recipeDiv);
  } catch (err) {
    const errorDiv = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('beforeend', errorDiv);
  }
};

////////////////////////////////////////////////////////////
// add event listeners

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
