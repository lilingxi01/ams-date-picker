import React from 'react';
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  media: {
    sm: '(min-width: 568px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
  },
});

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
