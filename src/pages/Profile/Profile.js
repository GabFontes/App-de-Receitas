import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, TextButton } from '../../components';
import { PagesContext } from '../../context';
import { getFromLocalStorage } from '../../services';

export const Profile = () => {
  const { setPageName } = useContext(PagesContext);
  const history = useHistory();
  const [email, setEmail] = useState();

  useEffect(() => setPageName('Profile'), [setPageName]);

  useEffect(() => {
    (() => {
      const getEmail = getFromLocalStorage('user') || { email: '' };
      setEmail(getEmail.email);
    })();
  }, []);

  const handleClick = (endPoint) => {
    history.push(endPoint);
  };

  return (
    <div>
      <div className="background" />
      <Header />
      <div className="container mh-100">
        <div
          className="
            d-flex
            pt-5
            h-50
            flex-column
            align-items-center
            justify-content-between"
        >
          <h4
            data-testid="profile-email"
            className="text-dark bg-warning rounded-lg text-center p-2 mb-5"
          >
            { email }
          </h4>
          <TextButton
            className="btn-block btn-info my-2"
            testID="profile-done-btn"
            onClick={ () => handleClick('/done-recipes') }
            text="Done Recipes"
          />
          <TextButton
            className="btn-block btn-info my-2"
            testID="profile-favorite-btn"
            onClick={ () => handleClick('/favorite-recipes') }
            text="Favorite Recipes"
          />
          <TextButton
            className="btn-block btn-danger my-5"
            testID="profile-logout-btn"
            onClick={ () => localStorage.clear() > history.push('/') }
            text="Logout"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
