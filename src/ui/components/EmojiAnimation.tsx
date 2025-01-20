import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

const EMOJIS = {
  thumbsUp: '👍',
  heart: '❤️',
} as const;

export interface EmojiAnimationRef {
  startAnimation: () => void;
}
const EmojiAnimation = forwardRef<EmojiAnimationRef, {}>((_, ref) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [randSign, setRandSign] = useState(randomSign());

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  const getText = useCallback(() => {
    const specialChance = 0.5;
    return Math.random() < specialChance ? EMOJIS.thumbsUp : EMOJIS.heart;
  }, [randSign]);

  const xPosition = useMemo(
    () =>
      rotateAnim.interpolate({
        inputRange: [0, 2, 6, 8, 10],
        outputRange: [0, randSign * 20, randSign * 20, randSign * 10, 0],
      }),
    [randSign]
  );

  const yPosition = rotateAnim.interpolate({
    inputRange: [0, 2, 5, 10],
    outputRange: [0, -70, -90, -40],
  });

  const scale = rotateAnim.interpolate({
    inputRange: [0, 1, 5, 7, 10],
    outputRange: [0, 1, 1, 0.5, 0],
  });

  const startAnimation = () => {
    const yPosAnimation = Animated.timing(rotateAnim, {
      toValue: 10,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const xPosAnimation = Animated.timing(rotateAnim, {
      toValue: 10,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const scaleAnimation = Animated.timing(rotateAnim, {
      toValue: 10,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.parallel([yPosAnimation, xPosAnimation, scaleAnimation]).start(() => {
      rotateAnim.setValue(0);
      setRandSign(randomSign());
    });
  };

  return (
    <View style={styles.emojiAminationWrapper}>
      <Animated.View
        style={[
          {
            transform: [{ translateY: yPosition }, { translateX: xPosition }, { scale: scale }],
            left: Math.random() * 120 - 60,
            top: Math.random() * 40 - 20,
          },
        ]}
      >
        <Text style={styles.emojiTextDefault}>{getText()}</Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  emojiAminationWrapper: {
    margin: 'auto',
    position: 'absolute',
  },
  emojiTextDefault: {
    fontSize: 40,
  },
});
export default EmojiAnimation;
