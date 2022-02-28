import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import addFieldsToRecipe from '../helpers/utils';
import {
  getAllAreas,
  getAllByArea,
  getAllByIngredient,
  getAllCategories,
  getAllDrinks,
  getAllMeals,
  getCategory,
  getFromLocalStorage,
  getRecipeById,
} from '../services';
import { RecipesContext } from './RecipesContext';

const MAX_RECOMMENDED = 6;

export const RecipesProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [categoriesList, setCategoriesList] = useState([]);
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');
  const [currentFilter, setCurrentFilter] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [type, setType] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const filterByIgredient = useCallback(async ({ searchTerm }) => {
    const newRecipes = await getAllByIngredient({ searchTerm, type });
    if (pathname === '/foods') setFilteredRecipes(newRecipes.meals);
    else if (pathname === '/drinks') setFilteredRecipes(newRecipes.drinks);
  }, [pathname, type]);
  useEffect(() => {
    if (ingredientFilter) filterByIgredient({ searchTerm: ingredientFilter });
  }, [filterByIgredient, ingredientFilter]);

  const filterByArea = useCallback(async ({ searchTerm }) => {
    if (searchTerm === 'All') return setFilteredRecipes(recipes);
    const newRecipes = await getAllByArea({ searchTerm });
    setFilteredRecipes(newRecipes.meals);
  }, [recipes]);
  useEffect(() => {
    if (nationalityFilter) filterByArea({ searchTerm: nationalityFilter });
  }, [filterByArea, nationalityFilter]);

  useEffect(() => {
    (async () => {
      if (pathname.includes('/foods')) setType('meal');
      if (pathname.includes('/drinks')) setType('drink');
    })();
  }, [pathname]);

  const reloadFavorites = () => {
    const favorites = getFromLocalStorage('favoriteRecipes') || [];
    setFavoriteRecipes(favorites);
  };

  useEffect(() => {
    (async () => {
      reloadFavorites();
      const allNationalities = await getAllAreas();
      setNationalities(allNationalities.meals);
      if (pathname === '/foods') {
        const allCategories = await getAllCategories({ type: 'meal' });
        setCategoriesList(allCategories.meals);
      }
      if (pathname === '/drinks') {
        const allCategories = await getAllCategories({ type: 'drink' });
        setCategoriesList(allCategories.drinks);
      }
    })();
  }, [pathname]);

  const setCurrentRecipe = useCallback(async (id) => {
    if (id && type) {
      const recipeID = type === 'meal' ? 'idMeal' : 'idDrink';
      let currentRecipe = recipes.find((item) => item[recipeID] === id);
      if (!currentRecipe) {
        const fetchedRecipe = await getRecipeById({ searchTerm: id, type });
        [currentRecipe] = fetchedRecipe[`${type}s`];
      }
      addFieldsToRecipe(currentRecipe, type);
      setRecipe(currentRecipe);
      if (type === 'meal') {
        const allDrinks = await getAllDrinks();
        const recommendedDrinks = allDrinks.drinks.slice(0, MAX_RECOMMENDED);
        recommendedDrinks.forEach((drink) => {
          drink.id = drink.idDrink;
          drink.title = drink.strDrink;
          drink.photo = drink.strDrinkThumb;
        });
        setRecommended(recommendedDrinks);
      } else {
        const allMeals = await getAllMeals();
        const recommendedMeals = allMeals.meals.slice(0, MAX_RECOMMENDED);
        recommendedMeals.forEach((meal) => {
          meal.id = meal.idMeal;
          meal.title = meal.strMeal;
          meal.photo = meal.strMealThumb;
        });
        setRecommended(recommendedMeals);
      }
    }
  }, [recipes, type]);

  useEffect(() => {
    (async () => {
      const mealsData = await getAllMeals();
      setMeals(mealsData.meals);
      const drinksData = await getAllDrinks();
      setDrinks(drinksData.drinks);
    })();
  }, []);

  const loadMeals = useCallback(() => {
    setRecipes(meals);
    setFilteredRecipes(meals);
  }, [meals]);
  const loadDrinks = useCallback(() => {
    setRecipes(drinks);
    setFilteredRecipes(drinks);
  }, [drinks]);

  const loadRecipes = useCallback(() => {
    if (pathname.includes('/food')) loadMeals();
    if (pathname.includes('/drink')) loadDrinks();
  }, [pathname, loadDrinks, loadMeals]);

  const fetchApi = async (searchTerm) => {
    if (searchTerm === currentFilter) {
      setFilteredRecipes(recipes);
      return setCurrentFilter('All');
    }
    const category = await getCategory({ searchTerm, type });
    if (pathname === '/foods') {
      setFilteredRecipes(category.meals);
    } else if (pathname === '/drinks') {
      setFilteredRecipes(category.drinks);
    }
    setCurrentFilter(searchTerm);
  };

  const toggleIsFavorite = () => {
    setRecipe((prev) => ({ ...prev, isFavorite: !recipe.isFavorite }));
  };

  const toggleIsDone = () => {
    setRecipe((prev) => ({ ...prev, isDone: !recipe.isDone }));
  };

  const updateIngredientFilter = ({ searchTerm }) => setIngredientFilter(searchTerm);
  const updateNationalityFilter = ({ searchTerm }) => setNationalityFilter(searchTerm);

  const context = {
    categoriesList,
    favoriteRecipes,
    fetchApi,
    filteredRecipes,
    loadRecipes,
    nationalities,
    recipe,
    recipes,
    recommended,
    reloadFavorites,
    setCategoriesList,
    setCurrentRecipe,
    setFilteredRecipes,
    setRecipes,
    toggleIsDone,
    toggleIsFavorite,
    updateIngredientFilter,
    updateNationalityFilter,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
