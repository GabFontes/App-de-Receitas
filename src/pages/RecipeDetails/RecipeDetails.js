import React, { useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  BackButton,
  FavoriteButton,
  RecommendedRecipes,
  ShareButton,
  StartRecipeButton,
} from '../../components';
import { RecipesContext } from '../../context';

export const RecipeDetails = () => {
  const { recipe, setCurrentRecipe } = useContext(RecipesContext);
  const { id } = useParams();

  useLayoutEffect(() => {
    setCurrentRecipe(id);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [id, setCurrentRecipe]);

  return (
    <div>
      <div className="background" />
      <BackButton />
      <img
        alt={ recipe.title }
        className="w-100"
        data-testid="recipe-photo"
        src={ recipe.photo }
      />
      <div className="container bg-glass">
        <div className="d-flex">
          <h2 data-testid="recipe-title" className="flex-grow-1">{ recipe.title }</h2>
          <ShareButton testID="share-btn" textToShare={ window.location.href } />
          <FavoriteButton
            testID="favorite-btn"
            recipe={ recipe }
            isFavorite={ recipe.isFavorite }
          />
        </div>
        <div
          data-testid="recipe-category"
          className="text-muted"
        >
          { recipe.category }
        </div>
        <div className="dropdown-divider" />
        <h4>Ingredients</h4>
        {
          recipe.ingredients
          && recipe.ingredients.map(({ ingredient, measure }, index) => (
            <div
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient}: ${measure}` }
            </div>
          ))
        }
        <div className="dropdown-divider" />
        <h4>Instructions</h4>
        <div
          style={ { whiteSpace: 'pre-line' } }
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </div>
        <div className="dropdown-divider mb-0" />
      </div>
      <div data-testid="video">
        { recipe.video && (
          <div>
            <div className="container py-2 bg-glass">
              <h4 className="m-0">Video</h4>
            </div>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={ recipe.video }
                allowFullScreen
                title="video"
              />
            </div>
            <div className="dropdown-divider my-0 bg-glass" />
          </div>
        ) }
      </div>
      <div className="container bg-glass py-2">
        <h4 className="m-0">Recommended</h4>
      </div>
      <div className="pb-3 bg-glass">
        <RecommendedRecipes />
      </div>
      {
        !recipe.done && <StartRecipeButton
          text={ `${recipe.inProgress ? 'Continue' : 'Start'} Recipe` }
        />
      }
    </div>
  );
};

export default RecipeDetails;
