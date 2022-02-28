import React, { useContext } from 'react';
import { RecipesContext } from '../../context';

export const NationalitiesDropdown = () => {
  const {
    nationalities,
    updateNationalityFilter,
  } = useContext(RecipesContext);

  const handleNationalitySelection = async ({ target: { value } }) => {
    await updateNationalityFilter({ searchTerm: value });
  };

  return (
    <div className="bg-dark btn btn-block my-2 p-0">
      <select
        className="btn btn-block text-warning"
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleNationalitySelection }
      >
        <option
          className="bg-secondary"
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        {
          nationalities.map(({ strArea }) => (
            <option
              className="bg-secondary"
              data-testid={ `${strArea}-option` }
              key={ strArea }
              value={ strArea }
            >
              { strArea }
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default NationalitiesDropdown;
