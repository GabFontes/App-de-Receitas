import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { PagesContext } from './PagesContext';

export const PagesProvider = ({ children }) => {
  const [pageName, setPageName] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const context = {
    showSearchBar,
    setShowSearchBar,
    pageName,
    setPageName,
  };

  return (
    <PagesContext.Provider value={ context }>
      { children }
    </PagesContext.Provider>
  );
};

PagesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PagesProvider;
