import { scale, verticalScale } from './styling';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f1efe3',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
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
