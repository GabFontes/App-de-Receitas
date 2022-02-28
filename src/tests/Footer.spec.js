import React from 'react';
import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import setComputedStyle from './helpers/setComputedStyle';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const DRINK_ICON_SRC = 'drinkIcon.svg';
const EXPLORE_ICON_SRC = 'exploreIcon.svg';
const MEAL_ICON_SRC = 'mealIcon.svg';

let mockedHistory;

const getIconButton = (name) => {
  const nameRegExp = new RegExp(name, 'i');
  const iconButton = screen.getByRole('button', { name: nameRegExp });
  return { iconButton };
};

const initComponent = async () => {
  await act(async () => {
    const { history } = renderWithRouter(<App />);
    mockedHistory = history;
    history.push('/foods');
  });
};

describe('Tests Footer component elements', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  describe('drinks button', () => {
    it('should have a drinks button', () => {
      const { iconButton: drinksButton } = getIconButton('drinks');
      expect(drinksButton).toBeInTheDocument();
    });
    it('should have the correct icon (drinks)', () => {
      const { iconButton: drinksButton } = getIconButton('drinks');
      const img = within(drinksButton).getByRole('img', { name: /drinks-bottom-btn/i });
      expect(img).toHaveAttribute('src', DRINK_ICON_SRC);
    });
  });

  describe('explore button', () => {
    it('should have a explore button', () => {
      const { iconButton: exploreButton } = getIconButton('explore');
      expect(exploreButton).toBeInTheDocument();
    });
    it('should have the correct icon (explore)', () => {
      const { iconButton: exploreButton } = getIconButton('explore');
      const img = within(exploreButton).getByRole('img', { name: /explore-bottom-btn/i });
      expect(img).toHaveAttribute('src', EXPLORE_ICON_SRC);
    });
  });

  describe('foods button', () => {
    it('should have a foods button', () => {
      const { iconButton: foodButton } = getIconButton('food');
      expect(foodButton).toBeInTheDocument();
    });
    it('should have the correct icon (food)', () => {
      const { iconButton: foodButton } = getIconButton('food');
      const img = within(foodButton).getByRole('img', { name: /food-bottom-btn/i });
      expect(img).toHaveAttribute('src', MEAL_ICON_SRC);
    });
  });
});

describe('Tests Footer component funcionality', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('drinks button should redirect to /drinks', () => {
    const { iconButton: drinksButton } = getIconButton('drinks');
    userEvent.click(drinksButton);
    expect(mockedHistory.location.pathname).toBe('/drinks');
  });

  it('explore button should redirect to /explore', () => {
    const { iconButton: exploreButton } = getIconButton('explore');
    userEvent.click(exploreButton);
    expect(mockedHistory.location.pathname).toBe('/explore');
  });

  it('food button should redirect to /food', () => {
    const { iconButton: foodButton } = getIconButton('food');
    userEvent.click(foodButton);
    expect(mockedHistory.location.pathname).toBe('/foods');
  });
});
