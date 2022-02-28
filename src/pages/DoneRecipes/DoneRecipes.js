import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, ShareButton, TextButton } from '../../components';
import { PagesContext } from '../../context';
import { getFromLocalStorage } from '../../services';

export const DoneRecipes = () => {
  const { setPageName } = useContext(PagesContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  const history = useHistory();

  useEffect(() => {
    if (filter === 'all') return setFilteredDoneRecipes(doneRecipes);
    setFilteredDoneRecipes(doneRecipes.filter(({ type }) => type === filter));
  }, [filter, doneRecipes]);

  useEffect(() => {
    const recipes = getFromLocalStorage('doneRecipes') || [];
    setDoneRecipes(recipes);
  }, []);

  useEffect(() => {
    setPageName('Done Recipes');
  }, [setPageName]);

  const handleRecipeClick = ({ type, id }) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="background" />
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
          filteredDoneRecipes.map(({
            id,
            name,
            image,
            category,
            nationality,
            doneDate,
            type,
            alcoholicOrNot,
            tags,
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
                <ShareButton
                  testID={ `${index}-horizontal-share-btn` }
                  textToShare={
                    window.location.href.replace('/done-recipes', `/${type}s/${id}`)
                  }
                />
              </div>
              <button
                onClick={ () => handleRecipeClick({ type, id }) }
                type="button"
                className="card-title m-0 btn btn-link text-dark"
              >
                <div data-testid={ `${index}-horizontal-name` }>
                  <h3>{ name }</h3>
                </div>
              </button>
              <div
                className="text-center"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Done in: ${doneDate}` }
              </div>
              <div className="d-flex justify-content-start p-2">
                {
                  type === 'food' && tags.map((tag) => (
                    <h5 key={ tag }>
                      <span
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        className="m-1 badge badge-pill badge-secondary"
                      >
                        { tag }
                      </span>
                    </h5>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DoneRecipes;
