import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import setComputedStyle from './helpers/setComputedStyle';
import App from '../App';
import { localStorageSimulator } from './mocks/localStorageSimulator';

const TEST_EMAIL_CORRECT = 'email@email.com';
const TEST_PASSWORD_CORRECT = '1234567';
const TEST_EMAIL_WRONG = 'email@email';
const TEST_PASSWORD_WRONG = '123456';
const MEALS_TOKEN = '1';
const COCKTAILS_TOKEN = '1';
const USER = JSON.stringify({
  email: TEST_EMAIL_CORRECT,
});

let mockedHistory;

localStorageSimulator();

describe('Tests Login Page', () => {
  beforeAll(setComputedStyle);

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    mockedHistory = history;
  });

  it('has an email input', () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
  it('has a password input', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it('has a login button', () => {
    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeInTheDocument();
  });
  it('is possible to fill email input', () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(emailInput, 'email@email.com');
    expect(emailInput).toHaveValue(TEST_EMAIL_CORRECT);
  });
  it('is possible to fill password input', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue(TEST_PASSWORD_CORRECT);
  });
  describe('should validate correctly', () => {
    it('email must have more than 6 characters', () => {
      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, TEST_PASSWORD_CORRECT);

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      userEvent.type(emailInput, TEST_EMAIL_WRONG);

      const submitButton = screen.getByRole('button', { name: /login/i });
      expect(submitButton).toHaveAttribute('disabled');

      userEvent.type(emailInput, TEST_EMAIL_CORRECT);
      expect(submitButton).not.toHaveAttribute('disabled');
    });
    it('password must have more than 6 characters', () => {
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      userEvent.type(emailInput, TEST_EMAIL_CORRECT);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, TEST_PASSWORD_WRONG);

      const submitButton = screen.getByRole('button', { name: /login/i });
      expect(submitButton).toHaveAttribute('disabled');

      userEvent.type(passwordInput, TEST_PASSWORD_CORRECT);
      expect(submitButton).not.toHaveAttribute('disabled');
    });
  });
  describe('should save tokens correctly:', () => {
    beforeEach(() => {
      mockedHistory.push('/');

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      userEvent.type(emailInput, TEST_EMAIL_CORRECT);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, TEST_PASSWORD_CORRECT);

      const submitButton = screen.getByRole('button', { name: /login/i });
      userEvent.click(submitButton);
    });
    it('should save mealsToken', async () => {
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mealsToken',
        MEALS_TOKEN,
      );
    });
    it('should save cocktailsToken', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'cocktailsToken',
        COCKTAILS_TOKEN,
      );
    });
    it('should save user email', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        USER,
      );
    });
  });
  it('should redirect to /foods on login', () => {
    mockedHistory.push('/');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    userEvent.type(emailInput, TEST_EMAIL_CORRECT);

    const passwordInput = screen.getByLabelText(/password/i);
    userEvent.type(passwordInput, TEST_PASSWORD_CORRECT);

    const submitButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(submitButton);

    expect(mockedHistory.location.pathname).toBe('/foods');
  });
});
