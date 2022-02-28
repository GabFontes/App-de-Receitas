import React from 'react';
import PropTypes from 'prop-types';

export const RadioButton = ({ id, label, name, onSelect, testID }) => (
  <div
    className="flex-grow-1 text-center p-2 m-1 text-white border border-white rounded"
  >
    <label
      htmlFor={ id }
      className="border-0 form-check-label bg-transparent"
    >
      <input
        className="form-check-input"
        data-testid={ testID }
        id={ id }
        name={ name }
        onChange={ onSelect }
        type="radio"
      />
      { `${label}` }
    </label>
  </div>
);

RadioButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  testID: PropTypes.string,
}.isRequired;

export default RadioButton;
