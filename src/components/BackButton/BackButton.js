import React from 'react';
import { useHistory } from 'react-router-dom';
import leftArrowBack from '../../images/leftArrowBack.svg';

export const BackButton = () => {
  const history = useHistory();
  return (
    <button
      className="position-absolute m-2 btn btn-sm rounded-lg btn-warning"
      type="button"
      onClick={ () => history.goBack() }
    >
      <img src={ leftArrowBack } alt="Back button" />
    </button>
  );
};

export default BackButton;
