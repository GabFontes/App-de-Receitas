import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('1 - Tests <Explore.js> component.', () => {
  // Solution to Error "Not implemented: window.computedStyle(elt, pseudoElt)"
// that appeared at console during tests (unknown reason);
// Found @ https://github.com/nickcolley/jest-axe/issues/147
  beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  // beforeEach(() => {
  //   renderWithRouter(<Explore />);
  // });

  it('has a button "Explore Foods" defined', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const exploreFoodButton = await screen.getByTestId('explore-foods');
    expect(exploreFoodButton).toBeDefined();
    await userEvent.click(exploreFoodButton);
    expect(history.location.pathname).toBe('/explore/foods');
  });

  it('has a button "Explore Drinks" defined', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const exploreDrinksButton = await screen.getByTestId('explore-drinks');
    expect(exploreDrinksButton).toBeDefined();
    await userEvent.click(exploreDrinksButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
