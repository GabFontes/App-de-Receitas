import React from 'react';
import PropTypes from 'prop-types';

export const IngredientCard = ({ cardName, index, src, onClick }) => (
  <button
    className="card col shadow-sm bg-glass p-2"
    type="button"
    onClick={ onClick }
    data-testid={ `${index}-ingredient-card` }
  >
    <img
      className="card-img-top"
      alt={ cardName }
      data-testid={ `${index}-card-img` }
      src={ src }
    />
    <h4
      className="card-title w-100 pt-2"
      data-testid={ `${index}-card-name` }
    >
      { cardName }
    </h4>
  </button>
);

IngredientCard.propTypes = {
  cardName: PropTypes.string,
  index: PropTypes.number,
  src: PropTypes.string,
}.isRequired;

export default IngredientCard;
