////////////////////////////////////////////////////////
// constants
// https://forkify-api.herokuapp.com/v2
const recipeApi = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
const testId = `5ed6604591c37cdc054bc886`;
const recipeUrl = id => recipeApi + id;

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const url = recipeUrl(id);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data, res);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
