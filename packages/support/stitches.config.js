import { createStitches } from '@stitches/react';
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors';

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
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      white: '#fff',
      black: '#000',
    },
    shadows: {
      'sm': '0 5px 6px 0 rgba(0, 0, 0, 0.03)',
      'md': '0 6px 8px 0 rgba(0, 0, 0, 0.03)',
      'lg': '0px 10px 16px rgba(0, 0, 0, 0.03)',
    },
    fontSizes: {
      'xxs': '11px',
      'xs': '12px',
      'sm': '13px',
      'base': '14px',
      'md': '15px',
      'lg': '16px',
      'xl': '17px',
      '2xl': '18px',
      '3xl': '19px',
      '4xl': '20px',
      '5xl': '22px',
      '6xl': '24px',
    },
    fonts: {
      'em': '"Newsreader", "Inter", sans-serif',
      'mono': 'Menlo, "SF Mono", "Roboto Mono", monospace',
    },
    radii: {
      'xs': '6px',
      'sm': '8px',
      'md': '10px',
      'base': '$md',
      'lg': '14px',
      'xl': '18px',
    },
  },
  media: {
    sm: '(min-width: 568px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
  },
});

export const amsDarkTheme = createTheme('ams-dark-theme', {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
});
