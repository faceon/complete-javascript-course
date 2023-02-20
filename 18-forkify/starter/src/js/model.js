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
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      imgSrc: recipe.image_url,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
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
