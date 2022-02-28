import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import setComputedStyle from './helpers/setComputedStyle';

describe('1 - Tests <Profile.js> component.', () => {
  beforeAll(setComputedStyle);

  it('has user\'s email', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeDefined();
  });
  it('has a button "Done Recipes" defined', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    expect(doneRecipesButton).toBeDefined();
    userEvent.click(doneRecipesButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('has a button "Favorite Recipes" defined', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesButton).toBeDefined();
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('has a button "Logout" defined', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeDefined();
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
