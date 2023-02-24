////////////////////////////////////////////////////////
import { API_URL, API_KEY, SEARCH_URL, ENTRIES_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
  page: {
    // 1-based indexing for page number. 0 means 'do not render'
    prev: 0,
    cur: 0,
    next: 0,
  },
  bookmarks: [],
};

const convertRecipe = function (recipe) {
  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imgSrc: recipe.image_url,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    newServings: recipe.servings,
    title: recipe.title,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    const { recipe } = data.data;
    state.recipe = convertRecipe(recipe);
    if (isInBookmarks(recipe.id)) state.recipe.bookmarked = true;
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async function (keyword) {
  try {
    state.search.query = SEARCH_URL + keyword;
    const data = await getJSON(state.search.query);
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => {
      return {
        imgSrc: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        id: recipe.id,
      };
    });
    setCurPage(1);
  } catch (err) {
    throw err;
  }
};

const setCurPage = function (curPage = 1) {
  curPage = Number.parseInt(curPage);
  const prevPage = curPage - 1;
  const nextPage = curPage + 1;
  const minPage = 1;
  const maxPage = Math.ceil(state.search.results.length / ENTRIES_PER_PAGE);
  state.page.prev = prevPage >= minPage ? prevPage : 0;
  state.page.cur = curPage;
  state.page.next = nextPage <= maxPage ? nextPage : 0;
};

export const getCurPage = function (curPage = 1) {
  setCurPage(curPage);
  const firstIndex = (state.page.cur - 1) * ENTRIES_PER_PAGE;
  const lastIndex = state.page.cur * ENTRIES_PER_PAGE;
  return state.search.results.slice(firstIndex, lastIndex);
};

const isInBookmarks = function (id) {
  return state.bookmarks.some(bookmark => bookmark.id === id);
};

export const toggleBookmark = function (recipe) {
  // if id is in bookmarks, remove it
  if (isInBookmarks(recipe.id)) {
    state.bookmarks.splice(state.bookmarks.indexOf({ id: recipe.id }), 1);
    state.recipe.bookmarked = false;
  } else {
    // if not, add it to bookmarks
    state.bookmarks.push({
      id: recipe.id,
      title: recipe.title,
      imgSrc: recipe.imgSrc,
      publisher: recipe.publisher,
    });
    state.recipe.bookmarked = true;
  }

  // save current bookmarks to local storage
  saveBookmarks(state.bookmarks);
};

const clearBookmarks = function () {
  localStorage.clear();
};

const saveBookmarks = function (bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // console.log('Bookmarks saved', bookmarks);
};

const loadBookmarks = function () {
  const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
  state.bookmarks = savedBookmarks;
  // console.log('Bookmarks loaded', state.bookmarks);
  return state.bookmarks;
};

export const updateServings = function (servingsChange) {
  if (state.recipe.newServings === 1 && servingsChange < 0)
    return console.log('cannot be less than 1');
  state.recipe.newServings += Number.parseInt(servingsChange);
};

export const addRecipe = async function (inputRecipe) {
  try {
    const ingredients = Object.entries(inputRecipe)
      .filter(
        entry => entry.at(0).startsWith('ingredient') && entry.at(1) !== ''
      )
      .map(entry => {
        const details = entry.at(1).split(',');
        if (details.length !== 3)
          throw new Error('Please use the correct format with commas');
        return {
          quantity: details[0] ? +details[0] : null,
          unit: details[1],
          description: details[2],
        };
      });

    const newRecipe = {
      cooking_time: +inputRecipe.cookingTime,
      image_url: inputRecipe.imgSrc,
      publisher: inputRecipe.publisher,
      servings: +inputRecipe.servings,
      source_url: inputRecipe.sourceUrl,
      title: inputRecipe.title,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, newRecipe);
    state.recipe = convertRecipe(data.data.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  loadBookmarks();
};

init();
