import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import error from "@material-ui/core/colors/red";

const primaryColor = "#0061cd";
const secondaryColor = "#0081f4";

const view = createMuiTheme();
export const theme = createMuiTheme({
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightBold: 800,
    fontWeightExtraBold: 1000,
    fontFamily: '"Roboto",sans-serif',
    fontSizeExtraSmall: 12,
    color: "#D8D8D8",
    h1: {
      fontSize: 28,
      fontWeight: 500
    },
    h2: {
      fontSize: 24,
      fontWeight: 700
    },
    h3: {
      fontSize: 22,
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: `${primaryColor}`,
      contrastText: "#ffffff"
    },
    secondary: {
      main: `${secondaryColor}`,
      contrastText: "#ffffff"
    },
    error: {
      light: error[300],
      main: "#EF4E22",
      dark: error[700],
      contrastText: "#ffffff"
    }
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 8
      }
    },
    MuiCard: {
      root: {
        margin: view.spacing(2, 0)
      }
    },
    MuiCardContent: {
      root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:last-child": {
          paddingBottom: view.spacing(2)
        }
      }
    }
  }
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
