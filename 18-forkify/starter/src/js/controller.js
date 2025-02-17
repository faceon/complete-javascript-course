import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

const controlRecipe = async function () {
  try {
    // get recipe id from address
    const id = recipeView.getId();
    if (!id) return;

    // show spinner while fetching
    recipeView.renderSpinner();

    // load recipe data onto state
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);

    // render bookmarks
    bookmarksView.render(model.state.bookmarks);

    // update recipe search results to activate selected link
    resultsView.update(model.getCurPage());
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

const controlServings = function (servingsChange) {
  // update current recipe's servings
  model.updateServings(servingsChange);

  // update recipe to refresh quantities
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  // save or remove current recipe to bookmarks
  model.toggleBookmark(model.state.recipe);

  // update recip8e
  recipeView.update(model.state.recipe);

  // update bookmark list
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  // pass data to model which saves to local storage
  try {
    await model.addRecipe(recipe);
    recipeView.render(model.state.recipe);
    model.toggleBookmark(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    addRecipeView.toggleHidden();
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err);
  }
};

////////////////////////////////////////////////////////////
// add event listeners
const init = function () {
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlBookmarks);

  searchView.addSearchHandler(controlSearch);
  paginationView.addPaginationHandler(controlPagination);
  addRecipeView.addRecipeFormHandler(controlAddRecipe);
};

init();
