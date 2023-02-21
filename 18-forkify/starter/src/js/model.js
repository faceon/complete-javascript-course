////////////////////////////////////////////////////////
import { API_URL, SEARCH_URL, ENTRIES_PER_PAGE } from './config';
import { getJSON } from './helpers';

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
  bookmarks: [
    {
      title: 'Beef Fajitas',
      id: '5ed6604591c37cdc054bcc30',
      imgSrc: 'http://forkify-api.herokuapp.com/images/fajitas1ffd9.jpg',
      publisher: 'The Pioneer Woman',
    },
    {
      id: '5ed6604691c37cdc054bd039',
      title: 'Perfect roast beef',
      imgSrc:
        'http://forkify-api.herokuapp.com/images/389_1_1350903718_lrg99fc.jpg',
      publisher: 'Jamie Oliver',
    },
    {
      id: '5ed6604591c37cdc054bcc97',
      title: 'Beef Fajita Nachos',
      imgSrc:
        'http://forkify-api.herokuapp.com/images/5399163424_3893f0580c_o7c75.jpg',
      publisher: 'The Pioneer Woman',
    },
  ],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    const { recipe } = data.data;
    state.recipe = {
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
    setCurPage();
  } catch (err) {
    throw err;
  }
};

export const setCurPage = function (curPage = 1) {
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

export const toggleBookmark = function (recipe) {
  const recipeFound = state.bookmarks.find(
    bookmark => bookmark.id === recipe.id
  );
  // if id is in bookmarks, remove it
  if (recipeFound) {
    state.bookmarks.splice(state.bookmarks.indexOf({ id: recipeFound.id }), 1);
  } else {
    // if not, add it to bookmarks
    state.bookmarks.push({
      id: recipe.id,
      title: recipe.title,
      imgSrc: recipe.imgSrc,
      publisher: recipe.publisher,
    });
  }

  // save current bookmarks to local storage
  saveBookmarks();
};

export const clearBookmarks = function () {
  localStorage.clear();
};

const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  console.log('saved', state.bookmarks);
};

export const loadBookmarks = function () {
  const loadedBookmarks = localStorage.getItem('bookmarks');
  console.log(loadedBookmarks);
  return loadedBookmarks;
  // state.bookmarks = loadedBookmarks ?? [];
  // console.log('loaded', state.bookmarks);
  // return state.bookmarks;
};

export const updateServings = function (servingsChange) {
  if (state.recipe.newServings === 1 && servingsChange < 0)
    return console.log('cannot be less than 1');
  state.recipe.newServings += Number.parseInt(servingsChange);
  console.log(
    'now servings are',
    state.recipe.newServings,
    '/',
    state.recipe.servings
  );
};
