import React from 'react';
import { Layout, styled } from '../support/stitches.config';
import { DefinedContainer } from './container';
import { DefinedTransition } from '../support/transition';

export const AmsWebsiteFooter = () => {
  return (
    <DefinedContainer
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
      }}
    >
      <Layout
        css={{
          fontSize: '$xs',
          color: '$mauve10',
          letterSpacing: '$text',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 6,
          '& a': {
            color: '$mauve12',
            fontWeight: 500,
            transition: DefinedTransition.cubic('text-decoration-color'),
            textDecoration: 'underline',
            textUnderlineOffset: '1.5px',
            textDecorationThickness: '1.5px',
            textDecorationColor: '$mauveA8',
            '@sm': {
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '1.5px',
                textDecorationThickness: '1.5px',
                textDecorationColor: '$mauveA10',
              },
            },
          },
        }}
      >
        <span>Crafted by</span>
        <a href={'https://lingxi.li/'} rel={'noopener noreferrer'} target={'_blank'}>Lingxi Li</a>
        <span>and all lovely contributors.</span>
      </Layout>
    </DefinedContainer>
  );
};
