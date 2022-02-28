import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  BackButton,
  CheckboxGroup,
  FavoriteButton,
  ShareButton,
  TextButton,
} from '../../components';
import { RecipesContext } from '../../context';
import { getFromLocalStorage, saveToLocalStorage } from '../../services';

const addRecipeToDone = ({
  id,
  type,
  strArea,
  strCategory,
  strAlcoholic,
  strTags,
  title,
  photo,
}) => {
  const doneRecipes = getFromLocalStorage('doneRecipes') || [];
  const doneDate = new Date().toLocaleDateString();
  doneRecipes.push({
    id,
    type,
    nationality: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: title,
    image: photo,
    doneDate,
    tags: strTags ? strTags.split(',') : [],
  });
  saveToLocalStorage('doneRecipes', doneRecipes);
};

const updateInProgress = (id, type, steps) => {
  const inProgressRecipes = getFromLocalStorage('inProgressRecipes') || {
    [type]: {
      [id]: [],
    },
  };
  if (!inProgressRecipes[type]) {
    inProgressRecipes[type] = {};
  }
  inProgressRecipes[type][id] = [];
  inProgressRecipes[type][id].push(...steps);
  saveToLocalStorage('inProgressRecipes', inProgressRecipes);
};

export const RecipeProgress = () => {
  const {
    recipe,
    setCurrentRecipe,
    toggleIsDone,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const history = useHistory();

  const [stepsDone, setStepsDone] = useState([]);

  useEffect(() => {
    if (!recipe.inProgress) return;
    const inProgressRecipes = getFromLocalStorage('inProgressRecipes');
    setStepsDone(inProgressRecipes[recipe.type][id]);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [recipe.type, id, recipe.inProgress]);

  useEffect(() => {
    if (recipe.ingredients) return;
    setCurrentRecipe(id);
  }, [id, recipe.ingredients, setCurrentRecipe]);

  useEffect(() => {
    if (!recipe.type) return;
    updateInProgress(id, recipe.type, stepsDone);
  }, [id, recipe.type, stepsDone]);

  const canFinish = useMemo(
    () => recipe.ingredients && stepsDone.length === recipe.ingredients?.length,
    [stepsDone.length, recipe.ingredients],
  );

  const handleChangeStep = ({ target }) => {
    const { name } = target;
    const updatedSteps = stepsDone.includes(name)
      ? stepsDone.filter((item) => item !== name)
      : stepsDone.concat(name);
    setStepsDone(updatedSteps);
  };

  const handleFinish = () => {
    addRecipeToDone(recipe);
    toggleIsDone();
    history.push('/done-recipes');
  };

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
      <div className="bg-glass">
        <div className="container">
          <div className="d-flex">
            <h2 data-testid="recipe-title" className="flex-grow-1">{ recipe.title }</h2>
            <ShareButton
              testID="share-btn"
              textToShare={ window.location.href.replace('/in-progress', '') }
            />
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
            recipe.ingredients && (
              <CheckboxGroup
                options={
                  recipe
                    .ingredients
                    .map(({ ingredient, measure }, index) => ({
                      id: ingredient,
                      label: `${ingredient} ${measure}`,
                      testID: `${index}-ingredient-step`,
                      checked: stepsDone.includes(ingredient),
                    }))
                }
                onChange={ handleChangeStep }
              />
            )
          }
          <div className="dropdown-divider" />
          <h4>Instructions</h4>
          <div
            style={ { whiteSpace: 'pre-line' } }
            data-testid="instructions"
          >
            { recipe.strInstructions }
          </div>
        </div>
        <TextButton
          className="btn-warning btn-block mt-2"
          disabled={ !canFinish }
          onClick={ handleFinish }
          testID="finish-recipe-btn"
          text="Finish Recipe"
        />
      </div>
    </div>
  );
};

export default RecipeProgress;
