import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const SEARCH_ICON_SRC = 'searchIcon.svg';
const PROFILE_ICON_SRC = 'profileIcon.svg';
const PAGE_TITLE_ID = 'page-title';

let mockedHistory;

describe('Testa os elementos do Header com seus respectivos data-testId\'s ', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
  });

  it('Verifica se existe na tela um botão com o data-testid="profile-top-btn"', () => {
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeDefined();
  });

  it('Verifica se existe na tela um botão com o data-testid="search-top-btn"', () => {
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeDefined();
  });

  it('Verifica os ícones dos botões', () => {
    const profileIcon = screen.getByAltText('profile-top-btn');
    expect(profileIcon).toBeDefined();
    expect(profileIcon).toHaveAttribute('src', PROFILE_ICON_SRC);

    const searchIcon = screen.getByAltText('search-top-btn');
    expect(searchIcon).toBeDefined();
    expect(searchIcon).toHaveAttribute('src', SEARCH_ICON_SRC);
  });
  it('Verifica se existe na tela um titulo com o data-testid="page-title"', () => {
    const headerTitle = screen.getByTestId(PAGE_TITLE_ID);
    expect(headerTitle).toBeDefined();
  });
});

describe('Verifica as rotas e o comportamento do Header em cada uma delas', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    mockedHistory = history;
  });

  it('O header tem os ícones corretos na tela de receitas de comidas', () => {
    mockedHistory.push('/foods');

    const profileButton = screen.getByRole('img', { name: /profile-top-btn/i });
    expect(profileButton).toBeDefined();
    expect(profileButton).toHaveAttribute('src', PROFILE_ICON_SRC);

    const searchButton = screen.getByRole('img', { name: /search-top-btn/i });
    expect(searchButton).toBeDefined();
    expect(searchButton).toHaveAttribute('src', SEARCH_ICON_SRC);
  });

  it('O header tem os ícones corretos na tela de receitas de bebidas', () => {
    mockedHistory.push('/drinks');

    const profileButton = screen.getByRole('img', { name: /profile-top-btn/i });
    expect(profileButton).toBeDefined();
    expect(profileButton).toHaveAttribute('src', PROFILE_ICON_SRC);

    const searchButton = screen.getByRole('img', { name: /search-top-btn/i });
    expect(searchButton).toBeDefined();
    expect(searchButton).toHaveAttribute('src', SEARCH_ICON_SRC);
  });
});
