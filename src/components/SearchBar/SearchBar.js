import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context';
import { getDrink, getMeal } from '../../services';
import { Input } from '../Input/Input';
import { RadioButtonGroup } from '../RadioButtonGroup/RadioButtonGroup';
import { TextButton } from '../TextButton/TextButton';

const searchOptions = [
  {
    id: 'ingredient',
    label: 'Ingredient',
    testID: 'ingredient-search-radio',
  },
  {
    id: 'name',
    label: 'Name',
    testID: 'name-search-radio',
  },
  {
    id: 'first-letter',
    label: 'First Letter',
    testID: 'first-letter-search-radio',
  },
];

export const SearchBar = () => {
  const [disable, setDisable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState();

  const { setFilteredRecipes } = useContext(RecipesContext);
  const location = useLocation();
  const history = useHistory();

  const getRecipes = async ({ type }) => {
    let recipes;
    let endpoint;
    if (type === 'Meal') {
      const { meals } = await getMeal({ searchTerm, searchOption });
      recipes = meals;
      endpoint = '/foods/';
    } else if (type === 'Drink') {
      const { drinks } = await getDrink({ searchTerm, searchOption });
      recipes = drinks;
      endpoint = '/drinks/';
    }

    if (!recipes) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (recipes.length === 1) {
      return history.push(`${endpoint}${recipes[0][`id${type}`]}`);
    }

    setFilteredRecipes(recipes);
  };

  useEffect(() => {
    const invalidTerm = !searchTerm;
    const invalidOption = !searchOption;
    setDisable(invalidTerm || invalidOption);
  }, [searchOption, searchTerm]);

  const handleSearch = async () => {
    if (searchOption === 'first-letter' && searchTerm.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    const { pathname } = location;

    if (pathname.includes('food')) {
      getRecipes({ type: 'Meal' });
    } else if (pathname.includes('drink')) {
      getRecipes({ type: 'Drink' });
    }
  };

  return (
    <div className="px-2 pb-1">
      <Input
        placeholder="Search Recipe"
        id="search-input"
        onChange={ ({ target: { value } }) => setSearchTerm(value) }
        testID="search-input"
        type="text"
      />
      <RadioButtonGroup
        options={ searchOptions }
        onSelect={ ({ target: { id } }) => setSearchOption(id) }
        groupName="search-radio-group"
      />
      <TextButton
        className="btn-block btn-warning mb-1"
        disabled={ disable }
        onClick={ handleSearch }
        testID="exec-search-btn"
        text="Search"
      />
    </div>
  );
};

export default SearchBar;
