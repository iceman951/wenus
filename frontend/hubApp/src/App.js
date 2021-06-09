import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@material-ui/core";
import { SocketContext, socket } from "./context/socket";
import { useSelector } from "react-redux";

import theme from "./theme";

function App() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const routing = useRoutes(routes(isLoggedIn));

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          {routing}
        </SocketContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
