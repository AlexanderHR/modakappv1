import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

export const LoadingView = () => {
  return (
    <ThemedView style={styles.loadingContainer}>
      <ActivityIndicator testID="loading-indicator" size="large" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
