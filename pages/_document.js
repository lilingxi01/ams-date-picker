import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../packages/support/stitches.config';

const AmsExampleDocument = () => {
  return (
    <Html>
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={ { __html: getCssText() } } />
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
