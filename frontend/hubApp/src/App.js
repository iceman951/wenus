import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

var theme = createMuiTheme({
  typography: {
    fontFamily: ["KanitRegular"].join(","),
    fontSize: 18,
  },
  palette: {
    primary: {
      light: "#96766b",
      main: "#674a40",
      dark: "#3b2219",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffe16a",
      main: "#fcaf38",
      dark: "#c48000",
      contrastText: "#000",
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <div style={{ background: "#f8f4f4", minHeight: "100vh" }}>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
