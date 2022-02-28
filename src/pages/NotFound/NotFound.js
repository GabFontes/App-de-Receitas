import React, { useContext, useEffect } from 'react';
import { Footer, Header } from '../../components';
import { PagesContext } from '../../context';

export const NotFound = () => {
  const { setPageName } = useContext(PagesContext);

  useEffect(() => setPageName('Not Found!'), [setPageName]);

  return (
    <div>
      <div className="background" />
      <Header searchButtonOn />
      <div
        className="
        container
        d-flex
        flex-column
        pt-5
        justify-content-center
        align-items-center"
      >
        <h1 className="bg-danger p-3 mb-5 rounded-lg">
          Not Found!
        </h1>
        <div className="bg-glass px-5 py-3 text-center rounded-pill">
          <h4>The content you are looking for could not be found.</h4>
          <h3>
            Please change your search.
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
