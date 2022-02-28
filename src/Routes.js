import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  DoneRecipes,
  Explore,
  ExploreByIngredient,
  ExploreRecipes,
  FavoriteRecipes,
  Login,
  NotFound,
  Profile,
  RecipeDetails,
  RecipeProgress,
  Recipes,
} from './pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Recipes } />
    <Route exact path="/drinks" component={ Recipes } />
    <Route exact path="/foods/:id" component={ RecipeDetails } />
    <Route exact path="/drinks/:id" component={ RecipeDetails } />
    <Route exact path="/foods/:id/in-progress" component={ RecipeProgress } />
    <Route exact path="/drinks/:id/in-progress" component={ RecipeProgress } />
    <Route exact path="/explore" component={ Explore } />
    <Route exact path="/explore/foods" component={ ExploreRecipes } />
    <Route exact path="/explore/drinks" component={ ExploreRecipes } />
    <Route path="/explore/foods/ingredients" component={ ExploreByIngredient } />
    <Route path="/explore/drinks/ingredients" component={ ExploreByIngredient } />
    <Route
      path="/explore/foods/nationalities"
      render={
        () => <Recipes isExplorePage />
      }
    />
    <Route path="/explore/drinks/nationalities" component={ NotFound } />
    <Route path="/profile" component={ Profile } />
    <Route path="/done-recipes" component={ DoneRecipes } />
    <Route path="/favorite-recipes" component={ FavoriteRecipes } />
  </Switch>
);

export default Routes;
