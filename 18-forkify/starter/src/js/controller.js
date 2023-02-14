import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import errorView from './views/errorView';
import icons from 'url:../img/icons.svg'; // Parcel 2

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    renderSpinner(recipeContainer);

    const recipe = await model.loadRecipe(id);
    recipeView(recipe, recipeContainer);
  } catch (err) {
    errorView(err, recipeContainer);
  }
};

////////////////////////////////////////////////////////////
// add event listeners

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
