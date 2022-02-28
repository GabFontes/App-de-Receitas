const DRINK_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const MEAL_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

const optionKeys = {
  ingredient: 'filter.php?i=',
  area: 'filter.php?a=',
  name: 'search.php?s=',
  'first-letter': 'search.php?f=',
  category: 'filter.php?c=',
  allCategories: 'list.php?c=list',
  allAreas: 'list.php?a=list',
  allIngredients: 'list.php?i=list',
  id: 'lookup.php?i=',
  randomId: 'random.php',
};

const get = async ({ searchTerm, searchOption, type }) => {
  const baseURL = type === 'drink' ? DRINK_BASE_URL : MEAL_BASE_URL;

  const option = optionKeys[searchOption];

  let term;
  if (window.Cypress) {
    term = searchTerm;
  } else {
    term = searchTerm.replaceAll(' ', '_');
  }

  const url = `${baseURL}${option}${term}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getCategory = ({ searchTerm, type }) => get({
  searchTerm,
  searchOption: 'category',
  type,
});

export const getRecipeById = ({ searchTerm, type }) => get({
  searchTerm,
  searchOption: 'id',
  type,
});

export const getRandomId = ({ type }) => get({
  searchTerm: '',
  searchOption: 'randomId',
  type,
});

export const getDrink = ({ searchTerm, searchOption }) => get({
  searchTerm,
  searchOption,
  type: 'drink',
});

export const getMeal = async ({ searchTerm, searchOption }) => get({
  searchTerm,
  searchOption,
  type: 'meal',
});

export const getAllByIngredient = async ({ searchTerm, type }) => get({
  searchTerm,
  searchOption: 'ingredient',
  type,
});

export const getAllByArea = async ({ searchTerm }) => get({
  searchTerm,
  searchOption: 'area',
  type: 'meal',
});

const getAll = async ({ type }) => get({
  searchTerm: '',
  searchOption: 'name',
  type,
});

export const getAllCategories = ({ type }) => get({
  searchTerm: '',
  searchOption: 'allCategories',
  type,
});

export const getAllAreas = () => get({
  searchTerm: '',
  searchOption: 'allAreas',
  type: 'meal',
});

export const getAllIngredients = ({ type }) => get({
  searchTerm: '',
  searchOption: 'allIngredients',
  type,
});

export const getAllMeals = async () => getAll({ type: 'meal' });

export const getAllDrinks = async () => getAll({ type: 'drink' });
