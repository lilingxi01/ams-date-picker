import React from 'react';
import { styled } from '../packages/support/stitches.config';

const LayoutContainer = styled('div', {});

export const Layout = ({ css, style, children, ...props }) => {
  return (
    <LayoutContainer
      css={{
        ...css,
        ...style,
      }}
      {...props}
    >
      {children}
    </LayoutContainer>
  );
};
