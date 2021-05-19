import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/Home/index";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Routing;
