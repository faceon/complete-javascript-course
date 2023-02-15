import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import errorView from './views/errorView';
// import icons from 'url:../img/icons.svg'; // Parcel 2

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

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    const recipe = await model.loadRecipe(id);
    recipeView.render(recipe);
  } catch (err) {
    errorView(err, recipeContainer);
  }
};

////////////////////////////////////////////////////////////
// add event listeners

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
