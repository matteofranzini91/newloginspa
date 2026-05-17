import generalBackground from '#Assets/images/general-background.png';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    quaternary: Palette['primary'];
    quinary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    quaternary?: PaletteOptions['primary'];
    quinary?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
      contrastText: '#7e57c2',
    },
    secondary: {
      main: '#681c99',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#7e57c2',
      contrastText: '#fff',
    },
    quaternary: {
      main: '#ff0abf',
      contrastText: '#fff',
    },
    quinary: {
      main: '#000',
      contrastText: '#fff',
    },
    text: {
      primary: '#7e57c2',
    },
  },

  breakpoints: {
    values: {
      xs: 360,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: '2.35rem',
      color: '#681c99',
      marginBottom: '1rem',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          color: '#7e57c2',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        html: {
          fontSize: '100%',
        },
        body: {
          backgroundImage: `url(${generalBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          '@media (max-width: 1360px)': {
            backgroundImage: 'none',
          },
        },
        a: {
          textDecoration: 'none',
        },
        '#root': {
          minHeight: '100%',
        },
        '.MuiAlert-icon path, .MuiAlert-message, .MuiAlert-action path': {
          color: '#fff',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          '& .MuiAlert-icon path': { color: '#fff' },
          '& .MuiAlert-message': { color: '#fff' },
          '& .MuiAlert-action path': { color: '#fff' },
        },
      },
    },
  },
});
