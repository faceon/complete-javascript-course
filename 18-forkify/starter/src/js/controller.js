import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import errorView from './views/errorView';
// import icons from 'url:../img/icons.svg'; // Parcel 2

const recipeContainer = document.querySelector('.recipe');

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
