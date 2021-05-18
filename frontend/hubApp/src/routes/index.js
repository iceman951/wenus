import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/Home/index";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";

const Routing = () => {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  if (!jwt) {
    return (
      <Switch>
        <Route exact path="/" component={() => <Login setJwt={setJwt} />} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routing;
