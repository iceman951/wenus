import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../views/Home/index";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";

const Routing = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Home /> : <Redirect to="/Login" />}
      </Route>
      <Route path="/Login" component={Login}>
        {loggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Routing;
