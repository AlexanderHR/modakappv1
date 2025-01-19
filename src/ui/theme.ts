import { scale, verticalScale } from './styling';

export const colors = {
  primary: '#a3e635',
  primaryLight: '#Oea5e9',
  primaryDark: '#0369a1',
  text: '#fff',
  textLight: '#e5e5e5',
  textLighter: '#d4d4d4',
  white: '#fff',
  black: '#000',
  rose: '#ef4444',
  green: '#16a34a',
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral350: '#CCCCC',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
};

export const spacingX = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};
export const spacingY = {
  xs: verticalScale(4),
  sm: verticalScale(8),
  md: verticalScale(16),
  lg: verticalScale(24),
  xl: verticalScale(32),
};
export const radius = {
  sm: scale(4),
  md: scale(8),
  lg: scale(16),
  xl: scale(24),
};
