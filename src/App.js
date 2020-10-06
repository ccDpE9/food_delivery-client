import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Restaurants from "./components/restaurants/Restaurants";
import Restaurant from "./components/restaurants/Restaurant";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
