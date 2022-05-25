import React from 'react';
import '../styles/globals.css';
import { styled } from '@stitches/react';
import { AmsDesign } from '../packages/support/standards.js';
import { AmsNavigationBar } from '../components/navbar.js';

const WebsiteBody = styled('div', {
  width: '100%',
  maxWidth: '960px',
  minHeight: '100vh',
  position: 'relative',
  margin: '0 auto',
  background: AmsDesign.color.white,
  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.06)',
  borderLeft: `1px solid ${AmsDesign.color.gray[200]}`,
  borderRight: `1px solid ${AmsDesign.color.gray[200]}`,
});

const PageBody = styled('div', {
  width: '100%',
});

const AmsExampleApp = ({ Component, pageProps }) => {
  return (
    <WebsiteBody>
      <AmsNavigationBar />
      <PageBody>
        <Component {...pageProps} />
      </PageBody>
    </WebsiteBody>
  );
};

export default AmsExampleApp;
