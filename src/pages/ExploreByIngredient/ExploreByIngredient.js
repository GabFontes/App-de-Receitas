import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, IngredientCard } from '../../components';
import { PagesContext, RecipesContext } from '../../context';
import { getAllIngredients } from '../../services';

const MAX_INGREDIENTS = 12;

export const ExploreByIngredient = () => {
  const { setPageName } = useContext(PagesContext);
  const { updateIngredientFilter } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const [ingredients, setIngredients] = useState([]);
  const [endpoint, setEndpoint] = useState('');
  const [apiName, setApiName] = useState('');

  const fetchIngredients = useCallback(async () => {
    if (pathname.includes('/foods')) {
      setApiName('meal');
      setEndpoint('/foods');
      const fetchedIngredients = await getAllIngredients({ type: 'meal' });
      setIngredients(fetchedIngredients.meals);
    }
    if (pathname.includes('/drinks')) {
      setApiName('cocktail');
      setEndpoint('/drinks');
      const fetchedIngredients = await getAllIngredients({ type: 'drink' });
      setIngredients(fetchedIngredients.drinks);
    }
  }, [pathname]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  useEffect(() => {
    setPageName('Explore Ingredients');
  }, [setPageName]);

  const handleIngredientSelection = async (ingredient) => {
    await updateIngredientFilter({ searchTerm: ingredient });
    history.push(endpoint);
  };

  return (
    <div>
      <div className="background" />
      <Header />
      <div className="container pb-5 text-center">
        <div className="row row-cols-2 gap-1 p-2">
          {
            ingredients
              .slice(0, MAX_INGREDIENTS)
              .map((response, index) => {
                const ingredient = response.strIngredient || response.strIngredient1;
                return (
                  <IngredientCard
                    key={ ingredient }
                    cardName={ ingredient }
                    index={ index }
                    src={ `https://www.the${apiName}db.com/images/ingredients/${ingredient}-Small.png` }
                    onClick={ () => handleIngredientSelection(ingredient) }
                  />
                );
              })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreByIngredient;
