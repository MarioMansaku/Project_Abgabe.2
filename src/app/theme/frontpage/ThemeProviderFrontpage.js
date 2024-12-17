import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
  } from "@mui/material";
  import React from "react";
  
  const appTheme = createTheme({
    palette: {
      primary: {
        main: "rgba(44, 44, 44, 1)",
      },
      secondary: {
        main: "rgba(227, 227, 227, 1)",
      },
      error: {
        main: "rgba(220, 27, 36, 1)",
      },
      background: {
        default: "rgba(255, 255, 255, 1)",
        paper: "rgba(0, 0, 0, 0.5)",
      },
      text: {
        primary: "rgba(30, 30, 30, 1)",
        secondary: "rgba(117, 117, 117, 1)",
      },
      divider: "rgba(217, 217, 217, 1)",
    },
    typography: {
      fontFamily: "Inter, Helvetica",
      h1: {
        fontSize: "72px",
        fontWeight: 700,
        letterSpacing: "-2.16px",
        lineHeight: "120%",
      },
      h2: {
        fontSize: "32px",
        fontWeight: 400,
        letterSpacing: "0px",
        lineHeight: "120%",
      },
      h3: {
        fontSize: "24px",
        fontWeight: 600,
        letterSpacing: "-0.48px",
        lineHeight: "120%",
      },
      h4: {
        fontSize: "20px",
        fontWeight: 400,
        letterSpacing: "0px",
        lineHeight: "120%",
      },
      subtitle1: {
        fontSize: "20px",
        fontWeight: 400,
        letterSpacing: "0px",
        lineHeight: "120%",
      },
      body1: {
        fontSize: "16px",
        fontWeight: 400,
        letterSpacing: "0px",
        lineHeight: "140%",
      },
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.h2,
          }),
          head: ({ theme }) => ({
            ...theme.typography.subtitle1,
          }),
          body: ({ theme }) => ({
            ...theme.typography.body1,
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: ({ theme }) => ({
            ...theme.typography.h2,
          }),
          secondary: ({ theme }) => ({
            ...theme.typography.body1,
          }),
        },
      },
    },
  });
  
  export const ThemeProvider = ({ children }) => {
    return (
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  };
  