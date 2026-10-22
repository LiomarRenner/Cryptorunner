const colors = {
  deep_black: '#0A0A0A',
  primary_green: '#BCFF31',
  gray: '#94978F',
  red: '#E01925',
  white: '#FFFFFF',
  // Semantic tokens
  text_muted: '#888888',
  text_secondary: '#808080',
  accent_muted: '#99CC33',
  on_primary: '#000000',
  divider: '#666666',
  divider_subtle: '#808080',
  gain: '#BCFF31',
  loss: '#FF4D4F',
};
export type Colors = typeof colors;

const shape = {
  borderRadius: 8,
  pill: 64,
};
export type Shape = typeof shape;

const spacing = {
  s4: 4,
  s8: 8,
  s12: 12,
  s16: 16,
  s24: 24,
  s32: 32,
};
export type Spacing = typeof spacing;

const fontSize = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
};
export type FontSize = typeof fontSize;

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
  fontSize,
  typography,
  shape,
};

export type Theme = typeof themes;
