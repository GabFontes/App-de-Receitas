import React from 'react';
import PropTypes from 'prop-types';

export const Toast = ({ message }) => (
  <div className="fixed-top">
    <div className="alert alert-success">
      <h5>{ message }</h5>
    </div>
  </div>
);

Toast.propTypes = {
  message: PropTypes.string,
}.isRequired;

export default Toast;
