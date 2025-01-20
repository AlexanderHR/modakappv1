import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { PressableScale } from './PressableScale';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
type Props = {
  errorDescription: string;
};
export default function ErrorView({ errorDescription }: Props) {
  return (
    <ThemedView style={styles.errorContainer}>
      <ThemedText style={styles.errorText}>{errorDescription}</ThemedText>
      <PressableScale
        testID="back-to-home-button"
        style={styles.homeButton}
        onPress={() => router.replace('/(tabs)')}
      >
        <ThemedText style={styles.buttonText}>Back to Home</ThemedText>
      </PressableScale>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
