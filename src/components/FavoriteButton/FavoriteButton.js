import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { IconButton } from '../IconButton/IconButton';
import noFavoriteIcon from '../../images/whiteHeartIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import { getFromLocalStorage, saveToLocalStorage } from '../../services';
import { RecipesContext } from '../../context';

const removeRecipeFromFavorites = ({ id }) => {
  console.log({ id });
  const favorites = getFromLocalStorage('favoriteRecipes') || [];
  const newFavorites = favorites.filter(({ id: savedID }) => savedID !== id);
  saveToLocalStorage('favoriteRecipes', newFavorites);
};

const addRecipeToFavorites = ({
  id,
  type,
  strArea,
  strCategory,
  strAlcoholic,
  title,
  photo,
}) => {
  const favorites = getFromLocalStorage('favoriteRecipes') || [];
  favorites.push({
    id,
    type,
    nationality: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: title,
    image: photo,
  });
  saveToLocalStorage('favoriteRecipes', favorites);
};

export const FavoriteButton = ({ isFavorite, recipe, testID, recipeID }) => {
  const { toggleIsFavorite, reloadFavorites } = useContext(RecipesContext);
  const { id } = useParams();

  const handleFavorite = () => {
    if (recipeID) {
      removeRecipeFromFavorites({ id: recipeID });
      return reloadFavorites();
    }
    if (isFavorite) {
      removeRecipeFromFavorites({ id });
    } else {
      addRecipeToFavorites(recipe);
    }
    toggleIsFavorite();
  };

  return (
    <IconButton
      testID={ testID }
      icon={ isFavorite ? favoriteIcon : noFavoriteIcon }
      altIcon="favorite-btn"
      onClick={ handleFavorite }
    />
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  testID: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.string),
  recipeID: PropTypes.string,
}.isRequired;

export default FavoriteButton;
