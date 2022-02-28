import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton } from './RadioButton/RadioButton';

export const RadioButtonGroup = ({ options, onSelect, groupName }) => (
  <div className="form-check form-check-inline d-flex m-0">
    {
      options.map(({ id, label, testID }) => (
        <RadioButton
          key={ id }
          id={ id }
          name={ groupName }
          label={ label }
          onSelect={ onSelect }
          testID={ testID }
        />
      ))
    }
  </div>
);

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
}.isRequired;

export default RadioButtonGroup;
