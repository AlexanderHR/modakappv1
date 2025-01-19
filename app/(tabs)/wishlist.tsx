import { Ionicons } from '@expo/vector-icons';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';

import { useWishlistStore } from '@/src/modules/products/store/useWishlistStore';
import { Product } from '@/src/modules/products/types/product';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { ThemedText } from '@/src/ui/components/ThemedText';
import { ThemedView } from '@/src/ui/components/ThemedView';
import { Colors } from '@/src/ui/theme';
import { router } from 'expo-router';
import { FlatList } from 'react-native';
import Toast from 'react-native-toast-message';

export default function WithListScreen() {
  const { items, removeFromWishlist } = useWishlistStore();
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: { item: Product }) => (
    <PressableScale
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}?from=wishlist`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <ThemedView style={styles.productInfo}>
        <ThemedText style={styles.productTitle}>{item.title}</ThemedText>
      </ThemedView>
      <PressableScale
        style={styles.removeButton}
        onPress={() => {
          removeFromWishlist(item.id);
          Toast.show({
            type: 'info',
            text1: 'Item removed from wishlist',
            position: 'bottom',
            visibilityTime: 1500,
          });
        }}
      >
        <Ionicons name="heart" size={24} color={Colors.light.tint} />
      </PressableScale>
    </PressableScale>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>Wishlist</ThemedText>
          {items.length > 0 && <ThemedText style={styles.counter}>({items.length})</ThemedText>}
        </ThemedView>
        {items.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <Ionicons name="heart-outline" size={48} color={Colors[colorScheme ?? 'light'].text} />
            <ThemedText style={styles.emptyText}>Your wishlist is empty</ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 50,
      android: StatusBar.currentHeight || 0,
      default: 0,
    }),
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 20,
    marginTop: -4,
    fontWeight: '500',
    marginLeft: 8,
    color: Colors.light.tint,
  },
  list: {
    gap: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: '600',
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
