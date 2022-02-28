import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FavoriteButton, Header, ShareButton, TextButton } from '../../components';
import { PagesContext, RecipesContext } from '../../context';

export const FavoriteRecipes = () => {
  const { setPageName } = useContext(PagesContext);
  const { favoriteRecipes } = useContext(RecipesContext);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  const history = useHistory();

  useEffect(() => {
    console.log({ favoriteRecipes });
    if (filter === 'all') return setFilteredFavoriteRecipes(favoriteRecipes);
    setFilteredFavoriteRecipes(favoriteRecipes.filter(({ type }) => type === filter));
  }, [filter, favoriteRecipes]);

  useEffect(() => {
    setPageName('Favorite Recipes');
  }, [setPageName]);

  const handleRecipeClick = ({ type, id }) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <>
      <div className="background" />
      <Header />
      <div className="container">
        <div className="row row-cols-3 px-1 bg-dark mb-2">
          <div className="col p-1">
            <TextButton
              className="btn-block btn-outline-warning btn-sm"
              onClick={ () => setFilter('all') }
              testID="filter-by-all-btn"
              text="All"
            />
          </div>
          <div className="col p-1">
            <TextButton
              className="btn-block btn-outline-warning btn-sm"
              onClick={ () => setFilter('food') }
              testID="filter-by-food-btn"
              text="Food"
            />
          </div>
          <div className="col p-1">
            <TextButton
              className="btn-block btn-outline-warning btn-sm"
              onClick={ () => setFilter('drink') }
              testID="filter-by-drink-btn"
              text="Drink"
            />
          </div>
        </div>
        {
          filteredFavoriteRecipes.map(({
            alcoholicOrNot,
            category,
            id,
            image,
            name,
            nationality,
            type,
          }, index) => (
            <div key={ id } className="card mb-1 shadow-sm bg-glass">
              <button
                onClick={ () => handleRecipeClick({ type, id }) }
                type="button"
                className="btn p-1"
              >
                <img
                  alt={ name }
                  className="card-img-top rounded"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                />
              </button>
              <div
                data-testid={ `${index}-horizontal-top-text` }
                className="text-muted justify-content-around align-items-center d-flex"
              >
                <h5 className="m-0">
                  { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
                </h5>
                <div className="d-flex">
                  <ShareButton
                    testID={ `${index}-horizontal-share-btn` }
                    textToShare={
                      window
                        .location
                        .href
                        .replace('/favorite-recipes', `/${type}s/${id}`)
                    }
                  />
                  <FavoriteButton
                    testID={ `${index}-horizontal-favorite-btn` }
                    recipeID={ id }
                    isFavorite
                  />
                </div>
              </div>
              <button
                onClick={ () => handleRecipeClick({ type, id }) }
                type="button"
                className="card-title m-0 btn btn-link text-dark"
              >
                <h2 data-testid={ `${index}-horizontal-name` } className="flex-grow-1">
                  { name }
                </h2>
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default FavoriteRecipes;
