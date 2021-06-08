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
      default: '#303030',
      main: `linear-gradient(-30deg, #F2994A 30%, #F2C94C 90%)`,
      paper: '#3B3B3B',

    },
    primary: {
      light: "#EB90CD",
      main: "#F2994A",
      dark: "#A15187",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#74A7F5",
      main: "#F2C94C",
      dark: "#3966AA",
      contrastText: "#FFF",
    },
  },
  common: {
    black: '#000',
    white: '#fff',
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
