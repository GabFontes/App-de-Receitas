import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Header,
  RecipeCard,
  Footer,
  Categories,
  NationalitiesDropdown,
} from '../../components';
import { RecipesContext, PagesContext } from '../../context';

const MAX_RECIPES = 12;

export const Recipes = ({ isExplorePage }) => {
  const { pathname } = useLocation();
  const { setPageName } = useContext(PagesContext);
  const {
    filteredRecipes,
    loadRecipes,
  } = useContext(RecipesContext);

  const history = useHistory();

  const [path, setPath] = useState();
  const [type, setType] = useState('Meal');

  useEffect(() => loadRecipes(), [loadRecipes]);

  useEffect(() => {
    if (isExplorePage) {
      setPath('/foods');
      return setPageName('Explore Nationalities');
    }
    if (pathname === '/foods') {
      setPageName('Foods');
      setPath('/foods');
      setType('Meal');
    } else if (pathname === '/drinks') {
      setPath('/drinks');
      setPageName('Drinks');
      setType('Drink');
    }
  }, [setPageName, pathname, isExplorePage]);

  return (
    <div>
      <div className="background" />
      <Header searchButtonOn />
      <div className="container pb-5">
        {
          isExplorePage
            ? <NationalitiesDropdown />
            : <Categories />
        }
        <div className="row px-1 mb-2">
          {
            filteredRecipes.length > 0
            && filteredRecipes
              .slice(0, MAX_RECIPES)
              .map((recipe, index) => (
                <RecipeCard
                  key={ recipe[`id${type}`] }
                  index={ index }
                  cardName={ recipe[`str${type}`] }
                  src={ recipe[`str${type}Thumb`] }
                  onClick={ () => history.push(`${path}/${recipe[`id${type}`]}`) }
                />
              ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

Recipes.propTypes = {
  isExplorePage: PropTypes.bool,
};

Recipes.defaultProps = {
  isExplorePage: false,
};

export default Recipes;
