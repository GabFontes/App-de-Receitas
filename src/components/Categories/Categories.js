import React, { useContext } from 'react';
import { RecipesContext } from '../../context';
import { TextButton } from '../TextButton/TextButton';

const MAX_CATEGORIES = 5;

export const Categories = () => {
  const {
    categoriesList,
    fetchApi,
    recipes,
    setFilteredRecipes,
  } = useContext(RecipesContext);
  return (
    <div className="row row-cols-2 px-1 bg-dark mb-2">
      <div className="col p-1">
        <TextButton
          className="btn-block btn-outline-warning btn-sm"
          testID="All-category-filter"
          text="All"
          onClick={ () => setFilteredRecipes(recipes) }
        />
      </div>
      {
        categoriesList
        && categoriesList
          .slice(0, MAX_CATEGORIES)
          .map(({ strCategory }) => (
            <div
              key={ strCategory }
              className="col p-1"
            >
              <TextButton
                className="btn-block btn-outline-warning btn-sm"
                text={ strCategory }
                testID={ `${strCategory}-category-filter` }
                onClick={ () => fetchApi(strCategory) }
              />
            </div>
          ))
      }
    </div>
  );
};

export default Categories;
