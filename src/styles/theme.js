import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import error from "@material-ui/core/colors/red";

const primaryColor = "#0061cd";
const secondaryColor = "#0081f4";

const primaryColorExpenses = "#d43030";
const secondaryColorExpenses = "#f34949";

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
    primaryGains: {
      main: `${primaryColor}`,
      contrastText: "#ffffff"
    },
    secondarygains: {
      main: `${secondaryColor}`,
      contrastText: "#ffffff"
    },
    primaryExpenses: {
      main: `${primaryColorExpenses}`,
      contrastText: "#ffffff"
    },
    secondaryExpenses: {
      main: `${secondaryColorExpenses}`,
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
    MuiFormControl: {
      root: {
        margin: view.spacing(1, 0)
      }
    },
    MuiTextField: {
      root: {
        margin: view.spacing(1, 0)
      }
    },
    MuiSkeleton: {
      root: {
        backgroundColor: "rgba(171, 171, 171, 0.8)"
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0
      },
      elevation1: {
        boxShadow: "none"
      }
    },
    MuiCard: {
      root: {
        margin: view.spacing(0),
        borderBottom: "1px solid #ececec"
      }
    },
    MuiButton: {
      root: {
        padding: "16px 16px"
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
    },
    MuiBox: {
      root: {
        padding: 0
      }
    },
    MuiTabs: {
      root: {
        minHeight: 35,
        "& button": {
          minHeight: 35,
          fontSize: 12
        }
      }
    }
  }
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
