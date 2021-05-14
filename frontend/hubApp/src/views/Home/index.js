import React from "react";
import AppBar from "./AppBar";
import CreatePost from "./CreatePost";
import Posts from "../../components/Posts"

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Divider,
  Card,
  CardContent,
  ThemeProvider,
} from "@material-ui/core";


let theme = createMuiTheme({
  typography: {
    fontSize: 25,
    color: "#000000",
  },
});

const Home = () => {

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <CreatePost />
      <Posts />
    </ThemeProvider>
  );
};

export default Home;
