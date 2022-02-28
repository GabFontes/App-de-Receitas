import React from 'react';
import PropTypes from 'prop-types';

export const Checkbox = ({ id, label, name, onChange, testID, checked }) => (
  <div className="form-check">
    <label data-testid={ testID } htmlFor={ id } className="form-check-label">
      <input
        className="form-check-input"
        id={ id }
        name={ name }
        onChange={ onChange }
        type="checkbox"
        defaultChecked={ checked }
      />
      { ` ${label}` }
    </label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  testID: PropTypes.string,
}.isRequired;

export default Checkbox;
