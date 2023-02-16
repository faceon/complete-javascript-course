import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

const searchField = document.querySelector('.search__field');

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    const recipe = await model.loadRecipe(id);
    recipeView.render(recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(err);
  }
};

const controlSearch = async function (e) {
  try {
    e.preventDefault();
    const keyword = searchField.value;
    console.log(keyword);
    if (!keyword) return;

    recipeView.renderSpinner();
    const searchResults = await model.searchRecipes(keyword);
    searchView.render(searchResults);
    const topResultId = searchResults.at(0).id;
    const recipe = await model.loadRecipe(topResultId);
    recipeView.render(recipe);
    console.log(model.state);
  } catch (err) {
    console.log(err);
    recipeView.renderError(err);
  }
};

const defaultSearch = function (keyword) {
  searchField.value = 'kimchi';
};

////////////////////////////////////////////////////////////
// add event listeners
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerRender(controlSearch);
  window.addEventListener('load', defaultSearch);
};

init();
