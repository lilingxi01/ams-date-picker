const AmsColor = {
  // TODO

  accentColor: '#0688ff',

  transparent: 'transparent',
  white: '#fff',
  black: '#000',

  gray: {
    30: '#fcfdfd',
    50: '#fafbfb',
    70: '#f7f8f8',
    100: '#f3f4f6',
    150: '#ebedf0',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

const AmsDimension = {
  // TODO
};

const AmsTransition = {
  cubic: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  cubicWith: (part) => `${part} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
};

export const AmsDesign = {
  color: AmsColor,
  dimension: AmsDimension,
  transition: AmsTransition,
};
