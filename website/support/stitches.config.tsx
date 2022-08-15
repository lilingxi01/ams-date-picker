import { createStitches } from '@stitches/react';
import {
  mauve,
  mauveA,
  blue,
  blueA,
  red,
  redA,
  yellow,
  yellowA,
  green,
  greenA,
  mauveDark,
  mauveDarkA,
  blueDark,
  blueDarkA,
  redDark,
  redDarkA,
  yellowDark,
  yellowDarkA,
  greenDark,
  greenDarkA,
  blackA,
  whiteA,
} from '@radix-ui/colors';
import React from 'react';

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
      ...mauve,
      ...mauveA,
      ...blue,
      ...blueA,
      ...red,
      ...redA,
      ...yellow,
      ...yellowA,
      ...green,
      ...greenA,
      ...blackA,
      ...whiteA,
      black: '$mauve12',
      white: '#fefeff',
      pageBackground: '$mauve1',
      border: '$mauveA4',
      fadedBorder: '$mauveA2',
      layoutBorder: '$mauveA3',
      clear: 'transparent',
      brand: '$primary',
      'primary': '$blue10',
      'primary1': '$blue1',
      'primary2': '$blue2',
      'primary3': '$blue3',
      'primary4': '$blue4',
      'primary5': '$blue5',
      'primary6': '$blue6',
      'primary7': '$blue7',
      'primary8': '$blue8',
      'primary9': '$blue9',
      'primary10': '$blue10',
      'primary11': '$blue11',
      'primary12': '$blue12',
      'primaryA1': '$blueA1',
      'primaryA2': '$blueA2',
      'primaryA3': '$blueA3',
      'primaryA4': '$blueA4',
      'primaryA5': '$blueA5',
      'primaryA6': '$blueA6',
      'primaryA7': '$blueA7',
      'primaryA8': '$blueA8',
      'primaryA9': '$blueA9',
      'primaryA10': '$blueA10',
      'primaryA11': '$blueA11',
      'primaryA12': '$blueA12',
    },
    shadows: {
      'interactive': '0 4px 0 0 $mauve4',
      'card': '0 10px 22px 0 rgba(0, 0, 0, 0.016)',
      'sm': '0 4px 10px 0 rgba(0, 0, 0, 0.03)',
      'md': '0 6px 14px 0 rgba(0, 0, 0, 0.03)',
      'lg': '0px 10px 20px rgba(0, 0, 0, 0.03)',
      'menu': '0px 14px 38px 0px rgba(22, 23, 24, 0.08), 0px 10px 20px -10px rgba(22, 23, 24, 0.04)',
      'eventArea': '0px 20px 45px 5px rgba(22, 23, 24, 0.08)',
      'eventAreaHover': '0px 40px 60px 5px rgba(22, 23, 24, 0.14)',
    },
    fontSizes: {
      'smallest': '11.5px',
      'xxs': '12.5px',
      'xs': '14px',
      'sm': '15px',
      'base': '16px',
      'md': '17px',
      'lg': '18px',
      'xl': '19px',
      '2xl': '20px',
      '3xl': '22px',
      '4xl': '26px',
      '5xl': '32px',
      '6xl': '40px',
      '7xl': '52px',
      '8xl': '62px',
      '9xl': '72px',
      '10xl': '82px',
      'title': '$5xl',
      'titleMobile': '$4xl',
    },
    letterSpacings: {
      'normal': '-0.001em',
      'text': '-0.001em',
      'largeText': '0.005em',
      'title': '-0.012em',
      'pageTitle': '-0.015em',
      'hero': '-0.020em',
    },
    fonts: {
      'typography': '"Source Serif 4Variable", "Source Serif 4", "Inter", sans-serif',
      'mono': 'Menlo, "SF Mono", "Roboto Mono", monospace',
      'number': '"InterVariable", sans-serif',
    },
    radii: {
      'xs': '4px',
      'sm': '6px',
      'base': '8px',
      'md': '10px',
      'lg': '12px',
      'xl': '16px',
      '2xl': '22px',
      '3xl': '28px',
    },
  },
  media: {
    sm: '(min-width: 480px)',
    md: '(min-width: 720px)',
    lg: '(min-width: 980px)',
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    ...mauveDark,
    ...mauveDarkA,
    ...blueDark,
    ...blueDarkA,
    ...redDark,
    ...redDarkA,
    ...yellowDark,
    ...yellowDarkA,
    ...greenDark,
    ...greenDarkA,
    'primary': '$blue9',
    black: '$mauve1',
    border: '$mauveA4',
    fadedBorder: '$mauveA3',
    layoutBorder: '$mauveA3',
  },
});

export const Layout = styled('div', {});
export const LinkLayout = styled('a', {});
export const SpanLayout = styled('span', {});

export type Polymorphic = string | React.ComponentType<any>;

export function mergeCss(candidates: string[]): string {
  return candidates.join(', ');
}

export type RichNodeType = (
  React.ReactElement<any>
  | React.ReactNode
  | React.ReactNode[]
  | string
  | null
  );

export type RichStyle = { [key: string]: any };
