import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'container' | 'content' | undefined;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant,
  ...otherProps
}: ThemedViewProps) {
  const customStyle: any = {};
  switch (variant) {
    case 'container':
      customStyle.flexDirection = 'row';
      customStyle.marginBottom = 4;
      customStyle.marginTop = 4;
      break;
    case 'content':
      customStyle.padding = 16;
      break;
  }
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style, customStyle]} {...otherProps} />;
}
