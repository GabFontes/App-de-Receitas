import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from './Checkbox/Checkbox';

export const CheckboxGroup = ({ options, onChange }) => (
  <>
    {
      options.map(({ id, label, testID, checked }) => (
        <Checkbox
          key={ testID }
          checked={ checked }
          id={ id }
          name={ id }
          label={ label }
          onChange={ onChange }
          testID={ testID }
        />
      ))
    }
  </>
);

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
}.isRequired;

export default CheckboxGroup;
