import '@fontsource/inter/variable-full.css';
import '@fontsource/source-serif-4/variable-full.css';
import '@fontsource/source-serif-4/variable-full-italic.css';

import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AmsNavigationBar } from '../components/navbar';
import { AmsWebsiteFooter } from '../components/footer';
import { ThemeProvider } from 'next-themes';
import { darkTheme, globalCss, styled } from '../support/stitches.config';

import '../styles/globals.css';

const WebsiteBody = styled('div', {
  width: '100%',
  padding: '40px 0 40px 0',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '@sm': {
    padding: '95px 0 50px 0',
  },
});

const PageBody = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function AmsApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const globalStyle = globalCss({
      '.react-loading-skeleton': {
        backgroundColor: '$colors$mauve4 !important',
        '--base-color': '$colors$mauve4 !important',
        '--highlight-color': '$colors$mauve6 !important',
      },
      'html': {
        backgroundColor: '$pageBackground',
      },
    });
    globalStyle();
  }, []);

  return (
    <ThemeProvider
      attribute={'class'}
      themes={['system', 'light', 'dark']}
      defaultTheme={'system'}
      value={{
        dark: darkTheme,
      }}
    >
      <WebsiteBody>
        <AmsNavigationBar />
        <PageBody>
          <Component {...pageProps} />
        </PageBody>
        <AmsWebsiteFooter />
      </WebsiteBody>
    </ThemeProvider>
  );
}
