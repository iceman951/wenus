import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

var theme = createMuiTheme({
    palette: {
      background: {
        default: '#303030',
        paper: '#424242',
      },
      primary: {
        light: "#EB90CD",
        main: "#fbc02d",
        dark: "#A15187",
        contrastText: "#FFF",
      },
      secondary: {
        light: "#74A7F5",
        main: "#00bcd4",
        dark: "#3966AA",
        contrastText: "#FFF",
      },
    },
    typography: {
      fontFamily: ["KanitRegular"].join(","),
      fontSize: 18,
      allVariants: {
        color: 'white',
      },
      h4: {
        fontFamily: ["KanitExtraBold"].join(","),
      },
      subtitle2: {
        color: 'gray',
      },
      caption: {
        color: 'gray',
      }
    },
  });
  theme = responsiveFontSizes(theme);

export default theme;
