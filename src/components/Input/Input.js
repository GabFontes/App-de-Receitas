import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  autoComplete,
  id,
  label,
  onChange,
  placeholder,
  testID,
  type,
}) => (
  <div>
    <div className="input-group">
      { label && (
        <label
          htmlFor={ id }
          className="input-group-prepend text-warning bg-dark p-2 rounded-lg w-25"
        >
          { label }
        </label>
      ) }
      <input
        className="form-control"
        autoComplete={ autoComplete }
        placeholder={ placeholder }
        data-testid={ testID }
        id={ id }
        name={ id }
        onChange={ onChange }
        type={ type }
      />
    </div>
  </div>
);

Input.propTypes = {
  autoComplete: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  testID: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

Input.defaultProps = {
  label: '',
  placeholder: '',
};

export default Input;
