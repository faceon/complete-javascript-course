////////////////////////////////////////////////////////
import { API_URL, SEARCH_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
  } catch (err) {
    throw err;
  }
};
