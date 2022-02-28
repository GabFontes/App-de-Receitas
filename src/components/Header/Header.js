import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PagesContext } from '../../context';
import { IconButton } from '../IconButton/IconButton';
import { SearchBar } from '../SearchBar/SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const PROFILE_TOP_BTN_ID = 'profile-top-btn';
const SEARCH_TOP_BTN_ID = 'search-top-btn';
export const Header = ({ searchButtonOn }) => {
  const {
    pageName,
    showSearchBar,
    setShowSearchBar,
  } = useContext(PagesContext);

  useEffect(() => setShowSearchBar(false), [setShowSearchBar]);

  const history = useHistory();

  const handleClick = () => {
    setShowSearchBar(false);
    history.push('/profile');
  };

  const toggleBar = () => setShowSearchBar(!showSearchBar);

  return (
    <div className="px-0 sticky-top bg-info">
      <div className="d-flex">
        <IconButton
          className="position-absolute left-0"
          testID={ PROFILE_TOP_BTN_ID }
          icon={ profileIcon }
          altIcon={ PROFILE_TOP_BTN_ID }
          onClick={ handleClick }
        />
        <h2
          data-testid="page-title"
          className="flex-grow-1 text-center text-medium m-2 align-self-center"
        >
          { pageName }
        </h2>
        {
          searchButtonOn
          && <IconButton
            className="position-absolute right-0"
            testID={ SEARCH_TOP_BTN_ID }
            icon={ searchIcon }
            altIcon={ SEARCH_TOP_BTN_ID }
            onClick={ toggleBar }
          />
        }
      </div>
      { showSearchBar && <SearchBar /> }
    </div>
  );
};

Header.propTypes = {
  searchButtonOn: PropTypes.bool,
};

Header.defaultProps = {
  searchButtonOn: false,
};

export default Header;
