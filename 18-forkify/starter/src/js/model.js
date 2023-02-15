////////////////////////////////////////////////////////
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
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
    return state.recipe;
  } catch (err) {
    console.error(err);
  }
};
