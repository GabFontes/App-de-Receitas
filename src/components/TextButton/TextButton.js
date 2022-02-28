import React from 'react';
import PropTypes from 'prop-types';

export const TextButton = ({
  className,
  disabled,
  onClick,
  submitButton,
  testID,
  text,
}) => (
  <button
    className={ `btn ${className}` }
    data-testid={ testID }
    disabled={ disabled }
    onClick={ onClick }
    type={ submitButton ? 'submit' : 'button' }
  >
    { text }
  </button>
);

TextButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  testID: PropTypes.string,
  text: PropTypes.string,
  submitButton: PropTypes.bool,
}.isRequired;

export default TextButton;
