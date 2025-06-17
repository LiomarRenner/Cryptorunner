const colors = {
  deep_black: '#0A0A0A',
  primary_green: '#BCFF31',
  gray: '#94978F',
  red: '#E01925',
  white: '#FFFFFF',
};
export type Colors = typeof colors;

const shape = {
  borderRadius: 8,
};
export type Shape = typeof shape;

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
export type Spacing = typeof spacing;

const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.gray,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.gray,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.gray,
  },
};
export type Typography = typeof typography;

export const themes = {
  colors,
  spacing,
  typography,
  shape,
};

export type Theme = typeof themes;
