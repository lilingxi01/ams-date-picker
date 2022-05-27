import React from 'react';
import '../styles/globals.css';
import { styled } from '@stitches/react';
import { AmsNavigationBar } from '../components/navbar.js';
import { AmsWebsiteFooter } from '../components/footer';

const WebsiteBody = styled('div', {
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  background: '#fbfbfb',
});

const PageBody = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const AmsExampleApp = ({ Component, pageProps }) => {
  return (
    <WebsiteBody>
      <AmsNavigationBar />
      <PageBody>
        <Component {...pageProps} />
      </PageBody>
      <AmsWebsiteFooter />
    </WebsiteBody>
  );
};

export default AmsExampleApp;
