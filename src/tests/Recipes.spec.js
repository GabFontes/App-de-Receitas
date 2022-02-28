import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const MAX_LENGTH_CARDS = 12;
const MAX_LENGTH_BUTTONS = 6;
const MAX_LENGTH_BREAKFAST_FILTER = 7;
const MAX_LENGTH_COCOA_FILTER = 9;

describe('A tela tem os data-testids dos 12 cards da tela de comidas e bebidas', () => {
  // Solution to Error "Not implemented: window.computedStyle(elt, pseudoElt)"
  // that appeared at console during tests (unknown reason);
  // Found @ https://github.com/nickcolley/jest-axe/issues/147
  beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  it('Verifica se existem 12 data-testids na tela de comidas', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    await screen.findByText('Corba');
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(MAX_LENGTH_CARDS);
  });

  it('Verifica se existem 12 data-testids na tela de bebidas', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(MAX_LENGTH_CARDS);
  });

  it('Verifica se os botões de filtrar categorias são rendrizados', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    await screen.findByTestId(/Beef-category-filter/i);
    const allButtons = await screen.findAllByTestId(/-category-filter/);
    expect(allButtons).toHaveLength(MAX_LENGTH_BUTTONS);
  });

  it('Verifica a opção de filtrar por todas as categorias', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    const allButtonFoods = await screen.getByRole('button', { name: /all/i });
    expect(allButtonFoods).toBeDefined();

    history.push('/drinks');
    const allButtonDrinks = await screen.getByRole('button', { name: /all/i });
    expect(allButtonDrinks).toBeDefined();
  });

  it('Verifica se o conteúdo muda de acordo com o filtro - Foods', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(MAX_LENGTH_CARDS);

    const beefButton = await screen.findByTestId(/Breakfast-category-filter/i);
    userEvent.click(beefButton);

    const filteredFoodCard = await screen.findByText('Breakfast Potatoes');
    expect(filteredFoodCard).toBeDefined();

    const filteredCards = await screen.findAllByTestId(/-recipe-card/);
    expect(filteredCards).toHaveLength(MAX_LENGTH_BREAKFAST_FILTER);
  });

  it('Verifica se o conteúdo muda de acordo com o filtro - Drinks', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/drinks');
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards).toHaveLength(MAX_LENGTH_CARDS);

    const beefButton = await screen.findByTestId(/Cocoa-category-filter/i);
    userEvent.click(beefButton);

    const filteredFoodCard = await screen.findByText('Castillian Hot Chocolate');
    expect(filteredFoodCard).toBeDefined();

    const filteredCards = await screen.findAllByTestId(/-recipe-card/);
    expect(filteredCards).toHaveLength(MAX_LENGTH_COCOA_FILTER);
  });
});
