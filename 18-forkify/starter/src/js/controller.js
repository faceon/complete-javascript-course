import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1) ?? `5ed6604591c37cdc054bc886`;
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(err);
  }
};

const controlSearch = async function () {
  try {
    // show spinner first while retrieving search results
    resultsView.renderSpinner();

    // fetch queried results
    const query = searchView.getQuery();
    await model.loadSearch(query);

    // load and render search results
    const { results } = model.state.search;
    resultsView.render(results);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

// if (module.hot) module.hot.accept();

////////////////////////////////////////////////////////////
// add event listeners
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  searchView.addSearchHandler(controlSearch);
};

init();
