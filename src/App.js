import React from "react";
import dataProvider from "components/admin/dataProvider";
import Register from "components/auth/Register";
import Navigation from "components/navigation/Navigation";
import Restaurant from "components/restaurants/Restaurant";
import Restaurants from "components/restaurants/Restaurants";
import { ListGuesser } from "ra-ui-materialui";
import { Admin, Resource } from "react-admin";
import { Route, Switch } from "react-router";
import authProvider from "components/admin/authProvider";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "components/admin/Dashboard";
import { MealsCreate } from "components/admin/meals/MealsCreate";
import { MealsEdit } from "components/admin/meals/MealsEdit";
import { MealShow } from "components/admin/meals/MealShow";
import Login from "components/auth/Login";
import Meal from "components/meals/Meal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Restaurants />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route
            path="/restaurant/:slug"
            render={(prop) => <Restaurant slug={prop} />}
          />
          <Route
            path="/meal/:slug"
            render={prop => <Meal slug={prop} />}
          />
          <Route path="/admin">
            <Admin dashboard={Dashboard} dataProvider={Object.assign(dataProvider)} authProvider={authProvider}>
              <Resource name="meals" list={ListGuesser} create={MealsCreate} edit={MealsEdit} show={MealShow}></Resource>
            </Admin>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
