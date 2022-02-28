import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { TextButton } from '../TextButton/TextButton';

export const StartRecipeButton = ({ text }) => {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <TextButton
      className="fixed-bottom bg-warning btn-block"
      onClick={ () => history.push(`${pathname}/in-progress`) }
      testID="start-recipe-btn"
      text={ text }
    />
  );
};

StartRecipeButton.propTypes = {
  text: PropTypes.string,
}.isRequired;

export default StartRecipeButton;
