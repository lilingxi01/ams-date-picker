import React from 'react';
import { Layout } from '../support/stitches.config';

export default function PageInstance() {
  return (
    <Layout
      css={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: '300',
        color: '$mauveA8',
        letterSpacing: '-0.01em',
      }}
    >
      This page is under construction.
    </Layout>
  );
}
