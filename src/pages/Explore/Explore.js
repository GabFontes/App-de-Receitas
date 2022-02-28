import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, TextButton } from '../../components';
import { PagesContext } from '../../context';

export const Explore = () => {
  const history = useHistory();
  const { setPageName } = useContext(PagesContext);

  useEffect(() => setPageName('Explore'), [setPageName]);

  const handleClick = (endPoint) => {
    history.push(endPoint);
  };

  return (
    <div>
      <div className="background" />
      <Header />
      <div className="container pt-3">
        <TextButton
          className="btn-block btn-info"
          testID="explore-foods"
          onClick={ () => handleClick('/explore/foods') }
          text="Explore Foods"
        />
        <TextButton
          className="btn-block btn-info"
          testID="explore-drinks"
          onClick={ () => handleClick('/explore/drinks') }
          text="Explore Drinks"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
