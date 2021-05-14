import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

var theme = createMuiTheme({
  typography: {
    fontFamily: ["-apple-system"].join(","),
    fontSize: 25,
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
