import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

const Routing = () => {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  let theme = createMuiTheme({
    typography: {
      fontFamily: ["-apple-system"].join(","),
      fontSize: 25,
    },
  });
  theme = responsiveFontSizes(theme);

  if (!jwt) {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={() => <Login setJwt={setJwt} />} />
          <Route path="/register" component={Register} />
        </Switch>
      </ThemeProvider>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routing;
