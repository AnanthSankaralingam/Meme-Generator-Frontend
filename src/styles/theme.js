import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import backgroundImage from '../../public/trump-v-harris.png';

export const brand = {
  50: '#F0F7FF',
  100: '#CEE5FD',
  200: '#9CCCFC',
  300: '#55A6F6',
  400: '#0A66C2',
  500: '#0959AA',
  600: '#064079',
  700: '#033363',
  800: '#02294F',
  900: '#021F3B',
};

export const gray = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
};

export const blue = {
  50: '#F0F7FF',   // Very light blue
  100: '#DCEEFF',  // Light blue
  200: '#B9DDFF',  // Soft blue
  300: '#80C4FF',  // Mild blue
  400: '#3399FF',  // Bright blue
  500: '#007BFF',  // Primary blue
  600: '#006FDB',  // Slightly darker blue
  700: '#005AA3',  // Dark blue
  800: '#00407A',  // Very dark blue
  900: '#002E58',  // Deep blue
};

export const green = {
  50: '#F6FEF6',
  100: '#E3FBE3',
  200: '#C7F7C7',
  300: '#A1E8A1',
  400: '#51BC51',
  500: '#1F7A1F',
  600: '#136C13',
  700: '#0A470A',
  800: '#042F04',
  900: '#021D02',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
    },
    secondary: {
      light: brand[300],
      main: brand[500],
      dark: brand[800],
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
    },
    grey: gray,
    divider: alpha(gray[300], 0.5),
    background: {
      default: 'linear-gradient(to top, #ffffff, #e6f2ff)',
      paper: alpha(gray[50], 0.8),
    },
    text: {
      primary: blue[900],
      secondary: gray[700],
    },
    action: {
      selected: alpha(brand[200], 0.2),
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Inter", "sans-serif"',
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});

const theme = createTheme({
  ...getDesignTokens('light'),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          borderRadius: '10px',
          textTransform: 'none',
          '&:active': {
            transform: 'scale(0.98)',
          },
          '&:focus-visible': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        },
        contained: {
          color: brand[50],
          background: brand[500],
          backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[600]})`,
          boxShadow: `inset 0 1px ${alpha(brand[300], 0.4)}`,
          outline: `1px solid ${brand[700]}`,
          '&:hover': {
            background: brand[400],
            backgroundImage: 'none',
            boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: gray[50],
          borderRadius: 10,
          border: `1px solid ${alpha(gray[200], 0.8)}`,
          boxShadow: 'none',
          transition: 'background-color, border, 80ms ease',
          background: `linear-gradient(to bottom, ${alpha('#e6f2ff', 0.8)}, ${alpha(gray[50], 0.8)})`,
          '&:hover': {
            borderColor: brand[300],
            boxShadow: `0 0 24px ${brand[100]}`,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: brand[300],
            },
            '&:hover fieldset': {
              borderColor: brand[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: brand[500],
            },
          },
          '& .MuiInputLabel-root': {
            color: brand[700],
            '&.Mui-focused': {
              color: brand[500],
            },
          },
        },
      },
    },
    
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: brand[700],
          fontWeight: 500,
          position: 'relative',
          textDecoration: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: '1px',
            bottom: 0,
            left: 0,
            backgroundColor: brand[200],
            opacity: 0.7,
            transition: 'width 0.3s ease, opacity 0.3s ease',
          },
          '&:hover::before': {
            width: '100%',
            opacity: 1,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `linear-gradient(to top, white, ${alpha(blue[200], 0.9)})`,
          // background:`linear-gradient((to top, transparent, ${brand[50]})`,
          // backgroundColor: brand[300],
          
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity: 0.7,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;