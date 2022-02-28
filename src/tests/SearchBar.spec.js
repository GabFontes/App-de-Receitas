import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import setComputedStyle from './helpers/setComputedStyle';
import App from '../App';
import {
  ALL_DRINKS,
  ALL_MEALS,
  DRINKS_BY_FIRST_LETTER,
  MEALS_BY_NAME,
  MEAL_BY_FIRST_LETTER,
  MEAL_BY_INGREDIENT,
  NO_MEALS_FOUND,
  SINGLE_MEAL_BY_NAME,
} from './mocks/apiResponses';

const fetchMock = jest.spyOn(window, 'fetch');
const alertMock = jest.spyOn(global, 'alert');
const SEARCH_BUTTON_TEST_ID = 'exec-search-btn';

const DRINK_URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

const MEAL_URL_BASE = 'https://www.themealdb.com/api/json/v1/1/';
const NO_RECIPE_FOUND_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';
const MORE_THAN_ONE_CHAR_MESSAGE = 'Your search must have only 1 (one) character';

const SEARCH_MEAL_BY_INGREDIENT_URL = `${MEAL_URL_BASE}filter.php?i=chicken_breast`;
const EXISTENT_INGREDIENT = 'chicken breast';

const SEARCH_MEAL_BY_NAME_URL = `${MEAL_URL_BASE}search.php?s=soup`;
const SINGLE_MEAL_NAME = 'arrabiata';
const MULTIPLE_MEALS_NAME = 'soup';
const FOUND_SINGLE_MEAL_ID = '52771';
const INEXISTENT_MEAL_NAME = 'abcde';

const SEARCH_DRINK_BY_FIRST_LETTER_URL = `${DRINK_URL_BASE}search.php?f=a`;
const SEARCH_MEAL_BY_FIRST_LETTER_URL = `${MEAL_URL_BASE}search.php?f=a`;
const SINGLE_CHAR_FIRST_LETTER = 'a';
const MULTIPLE_CHAR_FIRST_LETTER = 'abcde';

let mockedHistory;

const getRadioButton = (type) => {
  const nameRegExp = new RegExp(type, 'i');
  const radioButton = screen.getByRole('radio', { name: nameRegExp });
  return { radioButton };
};

const getElements = (type) => {
  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
  const { radioButton } = getRadioButton(type);
  return { searchButton, searchInput, radioButton };
};

const selectIngredient = async (ingredient) => {
  const { searchButton, searchInput, radioButton } = getElements('ingredient');
  await act(async () => {
    await userEvent.type(searchInput, ingredient);
    userEvent.click(radioButton);
    userEvent.click(searchButton);
  });
};

const selectName = async (name) => {
  const { searchButton, searchInput, radioButton } = getElements('name');
  await act(async () => {
    await userEvent.type(searchInput, name);
    userEvent.click(radioButton);
    userEvent.click(searchButton);
  });
};

const selectFirstLetter = async (firstLetter) => {
  const { searchButton, searchInput, radioButton } = getElements('first letter');
  await act(async () => {
    await userEvent.type(searchInput, firstLetter);
    userEvent.click(radioButton);
    userEvent.click(searchButton);
  });
};

const initComponent = async (endpoint = '/foods') => {
  fetchMock.mockResolvedValueOnce({ json: async () => (ALL_MEALS) });
  if (endpoint === '/drinks') {
    fetchMock.mockResolvedValueOnce({ json: async () => (ALL_DRINKS) });
  } else if (endpoint === '/foods') {
    fetchMock.mockResolvedValueOnce({ json: async () => (ALL_MEALS) });
  }

  await act(async () => {
    const { history } = renderWithRouter(<App />);
    mockedHistory = history;

    history.push(endpoint);

    const searchButton = await screen.findByRole('img', { name: /search-top-btn/i });
    userEvent.click(searchButton);
  });
};

describe('Tests SearchBar component elements', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('should have an ingredient radio input', () => {
    const { radioButton: ingredientRadio } = getRadioButton('ingredient');
    expect(ingredientRadio).toBeInTheDocument();
  });
  it('should have an name radio input', () => {
    const { radioButton: nameRadio } = getRadioButton('name');
    expect(nameRadio).toBeInTheDocument();
  });
  it('should have an first letter radio input', () => {
    const { radioButton: firstLetterRadio } = getRadioButton('first letter');
    expect(firstLetterRadio).toBeInTheDocument();
  });
});

describe('Tests SearchBar component funcionality (no Meals found)', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('should show an alert if no meals are found', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (NO_MEALS_FOUND) });

    await selectName(INEXISTENT_MEAL_NAME);

    expect(alertMock).toHaveBeenCalledWith(NO_RECIPE_FOUND_MESSAGE);
  });
});

describe('Tests SearchBar component funcionality (search meal by Ingredient)', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('should search by ingredient', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (MEAL_BY_INGREDIENT) });

    await selectIngredient(EXISTENT_INGREDIENT);

    expect(fetchMock).toHaveBeenCalledWith(SEARCH_MEAL_BY_INGREDIENT_URL);
  });
});

describe('Tests SearchBar component funcionality (search meal by Name)', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('should search by name', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (MEALS_BY_NAME) });

    await selectName(MULTIPLE_MEALS_NAME);

    expect(fetchMock).toHaveBeenCalledWith(SEARCH_MEAL_BY_NAME_URL);
  });

  it('should redirect to /foods/:id when only one result is found', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (SINGLE_MEAL_BY_NAME) });

    await selectName(SINGLE_MEAL_NAME);

    expect(mockedHistory.location.pathname).toBe(`/foods/${FOUND_SINGLE_MEAL_ID}`);
  });
});

describe('Tests SearchBar component funcionality (search meal by First Letter)', () => {
  beforeAll(setComputedStyle);
  beforeEach(initComponent);

  it('should search by first letter', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (MEAL_BY_FIRST_LETTER) });

    await selectFirstLetter(SINGLE_CHAR_FIRST_LETTER);

    expect(fetchMock).toHaveBeenCalledWith(SEARCH_MEAL_BY_FIRST_LETTER_URL);
  });

  it('should show an alert if search input has more than one character', async () => {
    await selectFirstLetter(MULTIPLE_CHAR_FIRST_LETTER);

    expect(alertMock).toHaveBeenCalledWith(MORE_THAN_ONE_CHAR_MESSAGE);
  });
});

describe('Tests SearchBar component funcionality (search drinks)', () => {
  beforeAll(setComputedStyle);
  beforeEach(() => initComponent('/drinks'));

  it('should search drinks', async () => {
    fetchMock.mockResolvedValueOnce({ json: async () => (DRINKS_BY_FIRST_LETTER) });

    await selectFirstLetter(SINGLE_CHAR_FIRST_LETTER);

    expect(fetchMock).toHaveBeenCalledWith(SEARCH_DRINK_BY_FIRST_LETTER_URL);
  });
});
