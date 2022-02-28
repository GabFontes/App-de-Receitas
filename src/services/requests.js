const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const requestByCategoryFoods = (category) => {
  const api = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data);
  return api;
};

export const requestByCategoryDrinks = (category) => {
  const api = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => data);
  return api;
};

export const requestMeals = () => {
  const api = fetch(FOODS_URL)
    .then((response) => response.json())
    .then((data) => data);
  return api;
};

export const requestDrinks = () => {
  const api = fetch(DRINKS_URL)
    .then((response) => response.json())
    .then((data) => data);
  return api;
};

export default requestByCategoryFoods;
