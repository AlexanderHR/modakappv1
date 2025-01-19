import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ImageCarousel } from '@/src/components/ImageCarousel';
import { useCalendar } from '@/src/hooks/useCalendar';
import { useProductDetailsStore } from '@/src/products/store/useProductDetailsStore';
import { useWishlistStore } from '@/src/products/store/useWishlistStore';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error, fetchProductDetails, reset } = useProductDetailsStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const colorScheme = useColorScheme();
  const { addProductReminder } = useCalendar();

  useEffect(() => {
    if (id) {
      fetchProductDetails(parseInt(id));
    }
    return () => {
      reset();
    };
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: loading
            ? 'Loading...'
            : error
              ? 'Product not found'
              : product?.title || 'Product Details',
          animation: 'none',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <PressableScale onPress={() => router.replace('/(tabs)')}>
              <Ionicons name="chevron-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
            </PressableScale>
          ),
          headerRight: () => {
            const isWishlisted = product ? isInWishlist(product.id) : false;

            return (
              <PressableScale
                onPress={() => {
                  if (!product) return;

                  if (isWishlisted) {
                    removeFromWishlist(product.id);
                    Toast.show({
                      type: 'info',
                      text1: 'Item removed from wishlist',
                      position: 'bottom',
                    });
                  } else {
                    addToWishlist(product);
                    Toast.show({
                      type: 'success',
                      text1: 'Item added to wishlist',
                      position: 'bottom',
                    });
                  }
                }}
              >
                <Ionicons
                  name={isWishlisted ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isWishlisted ? Colors.light.tint : Colors[colorScheme ?? 'light'].text}
                />
              </PressableScale>
            );
          },
        }}
      />

      {loading ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </ThemedView>
      ) : error || !product ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Error loading product details 😔</ThemedText>
          <PressableScale style={styles.homeButton} onPress={() => router.replace('/(tabs)')}>
            <ThemedText style={styles.buttonText}>Back to Home</ThemedText>
          </PressableScale>
        </ThemedView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => id && fetchProductDetails(parseInt(id))}
            />
          }
          style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        >
          <ImageCarousel images={product.images} />
          <ThemedView style={styles.content}>
            <ThemedText style={styles.title}>{product.title}</ThemedText>
            <ThemedText style={styles.brand}>{product.brand}</ThemedText>
            <ThemedText style={styles.price}>${product.price}</ThemedText>
            <ThemedText style={styles.description}>{product.description}</ThemedText>

            <ThemedView style={styles.infoContainer}>
              <ThemedText style={styles.infoLabel}>Rating:</ThemedText>
              <ThemedText style={styles.infoValue}>{product.rating} ⭐</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoContainer}>
              <ThemedText style={styles.infoLabel}>Stock:</ThemedText>
              <ThemedText style={styles.infoValue}>{product.stock} units</ThemedText>
            </ThemedView>

            <ThemedView style={styles.infoContainer}>
              <ThemedText style={styles.infoLabel}>Category:</ThemedText>
              <ThemedText style={styles.infoValue}>{product.category}</ThemedText>
            </ThemedView>

            <PressableScale
              style={styles.reminderButton}
              onPress={() => {
                const reminderDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hs
                addProductReminder(product, reminderDate);
              }}
            >
              <ThemedText style={styles.buttonText}>Add Purchase Reminder</ThemedText>
            </PressableScale>
          </ThemedView>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.tint,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
  },
  reminderButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    minWidth: 200,
  },
});
