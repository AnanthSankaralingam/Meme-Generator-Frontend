// Custom App component to initialize pages with shared layout and global styles

// pages/_app.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/global.css';
import '@fontsource/quicksand';
import '@fontsource/rakkas';
import backgroundImage from '../../public/trump-v-harris.png';


function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default MyApp;