import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, TextButton } from '../../components';
import { PagesContext } from '../../context';
import { getRandomId } from '../../services';

export const ExploreRecipes = () => {
  const { setPageName } = useContext(PagesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const [path, setPath] = useState();
  const [id, setId] = useState('');

  const initComponent = useCallback(async () => {
    if (pathname === '/explore/foods') {
      setPageName('Explore Foods');
      setPath('/foods');
      const randomId = await getRandomId({ type: 'meal' });
      setId(randomId.meals[0].idMeal);
    }
    if (pathname === '/explore/drinks') {
      setPageName('Explore Drinks');
      setPath('/drinks');
      const randomId = await getRandomId({ type: 'drink' });
      setId(randomId.drinks[0].idDrink);
    }
  }, [pathname, setPageName]);

  useEffect(() => {
    initComponent();
  }, [initComponent]);

  const handleClick = (endPoint) => {
    history.push(endPoint);
  };

  return (
    <div>
      <div className="background" />
      <Header />
      <div className="container pt-3">
        <TextButton
          className="btn-block btn-info"
          text="By Ingredient"
          testID="explore-by-ingredient"
          onClick={ () => handleClick(`/explore${path}/ingredients`) }
        />
        { path === '/foods' && (
          <TextButton
            className="btn-block btn-info"
            text="By Nationality"
            testID="explore-by-nationality"
            onClick={ () => handleClick(`/explore${path}/nationalities`) }
          />
        ) }
        <TextButton
          className="btn-block btn-warning"
          text="Surprise me!"
          testID="explore-surprise"
          onClick={ () => handleClick(`${path}/${id}`) }
        />
      </div>
      <Footer />
    </div>
  );
};

export default ExploreRecipes;
