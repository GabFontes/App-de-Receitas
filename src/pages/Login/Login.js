import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, TextButton } from '../../components';
import { saveToLocalStorage } from '../../services';

const VALID_EMAIL_REGEX = new RegExp(/^[\w-.]+@[\w-]+\.(?:[\w-]+\.)*[\w]{2,4}$/);
const MINIMUM_PASSWORD_LENGTH = 7;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const invalidEmail = !VALID_EMAIL_REGEX.test(email);
    const invalidPassword = password.length < MINIMUM_PASSWORD_LENGTH;
    setDisable(invalidEmail || invalidPassword);
  }, [email, password]);

  const handleLogin = (event) => {
    event.preventDefault();
    saveToLocalStorage('mealsToken', 1);
    saveToLocalStorage('cocktailsToken', 1);
    saveToLocalStorage('user', { email });
    history.push('/foods');
  };

  return (
    <div
      className="container vh-100"
    >
      <div className="background" />
      <form className="vh-100 d-flex flex-column justify-content-center">
        <h1 className="text-dark bg-warning rounded-lg text-center p-2 mb-5">
          InstaFood
        </h1>
        <Input
          autoComplete="email"
          id="email-input"
          label="Email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          testID="email-input"
          type="email"
        />
        <Input
          autoComplete="current-password"
          id="password-input"
          label="Password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          testID="password-input"
          type="password"
        />
        <TextButton
          disabled={ disable }
          className="btn-warning mt-4"
          onClick={ handleLogin }
          testID="login-submit-btn"
          text="Login"
          submitButton
        />
      </form>
    </div>
  );
};

export default Login;
