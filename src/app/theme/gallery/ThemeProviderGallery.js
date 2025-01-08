import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from '@mui/material';

const appTheme = createTheme({
    palette: {
        primary: {
            main: 'rgba(18, 47, 70, 1)',
        },
        secondary: {
            main: 'rgba(70, 41, 18, 1)',
        },
        error: {
            main: 'rgba(220, 27, 36, 1)',
        },
        background: {
            default: 'rgba(255, 255, 255, 1)',
            neutralTertiary: 'rgba(227, 227, 227, 1)',
            utilitiesScrim: 'rgba(255, 255, 255, 0.8)',
            brandDefault: 'rgba(44, 44, 44, 1)',
        },
        border: {
            brandDefault: 'rgba(44, 44, 44, 1)',
            default: 'rgba(217, 217, 217, 1)',
            neutralSecondary: 'rgba(118, 118, 118, 1)',
        },
        text: {
            brandOnBrand: 'rgba(245, 245, 245, 1)',
            primary: 'rgba(30, 30, 30, 1)',
        },
    },
    typography: {
        fontFamily: 'Inter, Helvetica',
        h1: {
            fontSize: '72px',
            fontWeight: 700,
            letterSpacing: '-2.16px',
            lineHeight: '120%',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            letterSpacing: '0px',
            lineHeight: '100%',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
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
