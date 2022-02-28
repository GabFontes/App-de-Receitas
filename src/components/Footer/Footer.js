import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import { IconButton } from '../IconButton/IconButton';

const FOOTER_DRINK_BUTTON_TESTID = 'drinks-bottom-btn';
const FOOTER_EXPLORE_BUTTON_TESTID = 'explore-bottom-btn';
const FOOTER_FOOD_BUTTON_TESTID = 'food-bottom-btn';

export const Footer = () => {
  const history = useHistory();
  return (
    <footer
      className="fixed-bottom bg-info d-flex justify-content-around"
      data-testid="footer"
    >
      <IconButton
        testID={ FOOTER_DRINK_BUTTON_TESTID }
        icon={ drinkIcon }
        altIcon={ FOOTER_DRINK_BUTTON_TESTID }
        onClick={ () => history.push('/drinks') }
      />
      <IconButton
        testID={ FOOTER_EXPLORE_BUTTON_TESTID }
        icon={ exploreIcon }
        altIcon={ FOOTER_EXPLORE_BUTTON_TESTID }
        onClick={ () => history.push('/explore') }
      />
      <IconButton
        testID={ FOOTER_FOOD_BUTTON_TESTID }
        icon={ mealIcon }
        altIcon={ FOOTER_FOOD_BUTTON_TESTID }
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
};

export default Footer;
