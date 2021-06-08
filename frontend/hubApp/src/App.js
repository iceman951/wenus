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
      paper: '#3B3B3B',
    },
    primary: {
      light: "#EB90CD",
      main: "#E675C1",
      dark: "#A15187",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#74A7F5",
      main: "#5292F3",
      dark: "#3966AA",
      contrastText: "#FFF",
    },
  },
  typography: {
    fontFamily: ["KanitRegular"].join(","),
    fontSize: 18,
    h4: {
      fontFamily: ["KanitExtraBold"].join(","),
    }
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
