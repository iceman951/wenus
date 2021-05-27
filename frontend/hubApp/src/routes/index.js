import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/Home/index";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";
import socketTest from "../views/SockTestPage";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/socketTest" component={socketTest} />
    </Switch>
  );
};

export default Routing;
