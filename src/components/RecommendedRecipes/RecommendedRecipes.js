import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context';

export const RecommendedRecipes = () => {
  const { recommended } = useContext(RecipesContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleClick = ({ id }) => {
    const path = pathname.includes('food')
      ? '/drinks/'
      : '/foods/';
    history.push(`${path}${id}`);
  };

  return (
    <div className="carousel">
      {
        recommended.map(({ id, title, photo, strCategory }, index) => (
          <button
            type="button"
            className="carousel-item btn pb-4 px-0"
            data-testid={ `${index}-recomendation-card` }
            key={ title }
            onClick={ () => handleClick({ id }) }
          >
            <div>
              <img
                alt={ title }
                src={ photo }
              />
            </div>
            <div
              className="
              d-flex
              flex-column
              justify-content-start
              align-items-baseline
              p-1"
            >
              <div
                data-testid={ `${index}-recomendation-title` }
              >
                <h5 className="m-0">{ title }</h5>
              </div>
              <div className="text-muted">
                { strCategory }
              </div>
            </div>
          </button>
        ))
      }
    </div>
  );
};

export default RecommendedRecipes;
