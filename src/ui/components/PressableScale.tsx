import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface PressableScaleProps extends PressableProps {
  scaleValue?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function PressableScale({
  scaleValue = 0.95,
  style,
  children,
  ...props
}: PressableScaleProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        style,
        {
          transform: [{ scale: pressed ? scaleValue : 1 }],
          transition: 'all 0.2s ease',
        },
      ]}
    >
      {children}
    </Pressable>
  );
}
