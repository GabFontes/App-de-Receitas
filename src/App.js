import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { PagesProvider, RecipesProvider } from './context';

import Routes from './Routes';

function App() {
  return (
    <PagesProvider>
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </PagesProvider>

  );
}

export default App;
