import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { SocketContext, socket } from "./context/socket";

var theme = createMuiTheme({
  palette: {
    background: {
      default: '#484848',
      main: `linear-gradient(-30deg, #F2994A 30%, #F2C94C 90%)`,
      paper: '#fff',

    },
    primary: {
      light: "#ffca79",
      main: "#F2994A",
      dark: "#bb6a1b",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#fffc7d",
      main: "#F2C94C",
      dark: "#bc9914",
      contrastText: "#FFF",
    },
  },
  typography: {
    fontFamily: ["KanitRegular"].join(","),
    fontSize: 18,
    h4: {
      fontFamily: ["KanitExtraBold"].join(","),
    },
    allVariants: {
      color: "#303030"
    },

  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SocketContext.Provider value={socket}>
            <Routing />
          </SocketContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
