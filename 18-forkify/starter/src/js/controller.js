import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

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

    // add event listner to +, - servings
    recipeView.addServingsHandler(controlServings);

    // add event listner to bookmark button
    bookmarksView.addBookmarksHandler(controlBookmarks);
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

    // load the first page of results
    const results = model.getCurPage();
    resultsView.render(results);

    // render pagination
    paginationView.render(model.state.page);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const controlPagination = function (pageToGo = 1) {
  // load the results for the page to go
  const results = model.getCurPage(pageToGo);
  resultsView.render(results);

  // render paginations
  paginationView.render(model.state.page);
};

const controlBookmarks = function () {
  // save or remove current recipe to bookmarks
  model.toggleBookmark(model.state.recipe);

  // refresh bookmark list
  bookmarksView.render(model.state.bookmarks);
};

const controlServings = function (servingsChange) {
  // update current recipe's servings
  model.updateServings(servingsChange);

  // render recipe again
  recipeView.render(model.state.recipe);
};

////////////////////////////////////////////////////////////
// add event listeners
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  searchView.addSearchHandler(controlSearch);
  paginationView.addPaginationHandler(controlPagination);
  bookmarksView.render(model.loadBookmarks());
};

init();
