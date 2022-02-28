import React from 'react';
import PropTypes from 'prop-types';

export const IconButton = ({
  testID,
  icon,
  altIcon,
  className,
  onClick,
}) => (
  <button
    className={ `btn btn-link ${className}` }
    data-testid={ testID }
    aria-label={ testID }
    type="button"
    src={ icon }
    onClick={ onClick }
  >
    <img src={ icon } alt={ altIcon } />
  </button>
);

IconButton.propTypes = {
  testID: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  altIcon: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default IconButton;
