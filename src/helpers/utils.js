import { getFromLocalStorage } from '../services';

const validIngredientKey = (key) => key.match(/strIngredient\d{1,2}/);

const validMeasureKey = (key) => key.match(/strMeasure\d{1,2}/);

const validValue = (value) => value && value.length > 0;

const getIndex = new RegExp(/(?<index>\d{1,2}$)/);

const mergeArrays = (arr1, arr2) => {
  const newArray = [];
  arr1.forEach(({ index, ingredient }) => {
    newArray.push({
      ingredient,
      measure: arr2.find((item) => item.index === index)?.ingredient || '',
    });
  });
  return newArray;
};

const mapValues = ([key, value]) => ({
  index: getIndex.exec(key).groups.index,
  ingredient: value,
});

const addIngredients = (recipe) => {
  recipe.ingredients = mergeArrays(
    Object
      .entries(recipe)
      .filter(([key, value]) => validIngredientKey(key) && validValue(value))
      .map(mapValues),
    Object
      .entries(recipe)
      .filter(([key, value]) => validMeasureKey(key) && validValue(value))
      .map(mapValues),
  );
};

const addIsDone = (recipe) => {
  const doneRecipes = getFromLocalStorage('doneRecipes') || [];
  if (doneRecipes.some(({ id: doneID }) => doneID === recipe.id)) {
    recipe.done = true;
    return;
  }
  recipe.done = false;
};

const addIsFavorite = (recipe) => {
  const favorites = getFromLocalStorage('favoriteRecipes') || [];
  if (favorites.some(({ id: savedID }) => savedID === recipe.id)) {
    recipe.isFavorite = true;
    return;
  }
  recipe.isFavorite = false;
};

const addInProgress = (recipe) => {
  const inProgress = getFromLocalStorage('inProgressRecipes') || {};
  recipe.inProgress = false;
  Object.values(inProgress).forEach((recipes) => {
    if (Object.keys(recipes).some((id) => id === recipe.id)) {
      recipe.inProgress = true;
    }
  });
};

const addFieldsToRecipe = (recipe, type) => {
  recipe.category = type === 'meal' ? recipe.strCategory : recipe.strAlcoholic;
  recipe.id = recipe.idMeal || recipe.idDrink;
  recipe.photo = recipe.strMealThumb || recipe.strDrinkThumb;
  recipe.title = recipe.strMeal || recipe.strDrink;
  recipe.type = type === 'meal' ? 'food' : 'drink';
  recipe.video = recipe.strYoutube?.replace('watch?v=', 'embed/');
  addIngredients(recipe);
  addIsDone(recipe);
  addIsFavorite(recipe);
  addInProgress(recipe);
};

export default addFieldsToRecipe;
