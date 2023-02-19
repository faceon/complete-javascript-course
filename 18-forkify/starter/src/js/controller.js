import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipe = async function () {
  try {
    // get recipe id from address
    const id = window.location.hash.slice(1) ?? `5ed6604591c37cdc054bc886`;
    if (!id) return;

    // show spinner while fetching
    recipeView.renderSpinner();

    // load recipe data onto state
    await model.loadRecipe(id);

    // render recipe
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

    // get and fetch query
    const query = searchView.getQuery();
    await model.loadSearch(query);

    // load results
    const results = model.loadCurPage();

    // render search results
    resultsView.render(results);

    // render pagination
    paginationView.render(model.state.page);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const controlPagination = function (pageToGo) {
  model.setCurPage(pageToGo);
  const results = model.loadCurPage();
  resultsView.render(results);
  paginationView.render(model.state.page);
};

// if (module.hot) module.hot.accept();

////////////////////////////////////////////////////////////
// add event listeners
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  searchView.addSearchHandler(controlSearch);
  paginationView.addPaginationHandler(controlPagination);
};

init();
