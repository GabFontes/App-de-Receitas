import React from 'react';
import PropTypes from 'prop-types';

export const RecipeCard = ({ cardName, index, src, onClick }) => (
  <button
    className="card mb-1 shadow-sm bg-glass"
    type="button"
    onClick={ onClick }
    data-testid={ `${index}-recipe-card` }
  >
    <div>
      <img
        className="card-img-top mt-1 rounded-lg"
        alt={ cardName }
        data-testid={ `${index}-card-img` }
        src={ src }
      />
    </div>
    <div className="card-title pt-2" data-testid={ `${index}-card-name` }>
      <h4>{ cardName }</h4>
    </div>
  </button>
);

RecipeCard.propTypes = {
  cardName: PropTypes.string,
  index: PropTypes.number,
  src: PropTypes.string,
}.isRequired;

export default RecipeCard;
