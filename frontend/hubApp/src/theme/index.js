import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

var theme = createMuiTheme({
  palette: {
    background: {
      default: "#484848",
      main: `linear-gradient(-30deg, #F2994A 30%, #F2C94C 90%)`,
      paper: "#fff",
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
    caption: {
      color: "gray",
    },
    allVariants: {
      color: "#303030",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
