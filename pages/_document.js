import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../packages/support/stitches.config';

const AmsExampleDocument = () => {
  return (
    <Html>
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={ { __html: getCssText() } } />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default AmsExampleDocument;
