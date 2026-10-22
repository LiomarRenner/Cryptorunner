// Raw palette: every hex value lives here exactly once.
const palette = {
  deep_black: '#0A0A0A',
  black: '#000000',
  primary_green: '#BCFF31',
  olive_green: '#99CC33',
  gray: '#94978F',
  mid_gray: '#888888',
  dark_gray: '#666666',
  red: '#E01925',
  coral_red: '#FF4D4F',
  white: '#FFFFFF',
};

// Semantic tokens reference the palette instead of repeating hex values.
const colors = {
  ...palette,
  text_muted: palette.mid_gray,
  accent_muted: palette.olive_green,
  on_primary: palette.black,
  divider: palette.dark_gray,
  divider_subtle: palette.mid_gray,
  gain: palette.primary_green,
  loss: palette.coral_red,
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
