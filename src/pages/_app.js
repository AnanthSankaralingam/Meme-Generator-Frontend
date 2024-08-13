// Custom App component to initialize pages with shared layout and global styles

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/global.css';
import '@fontsource/quicksand';
import '@fontsource/rakkas';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </>
  );
}

export default MyApp;