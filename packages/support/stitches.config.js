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
