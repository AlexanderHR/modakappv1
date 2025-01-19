import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ImageCarousel } from '@/src/components/ImageCarousel';
import { useProductDetailsStore } from '@/src/products/store/useProductDetailsStore';
import { useWishlistStore } from '@/src/products/store/useWishlistStore';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
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

  useEffect(() => {
    if (id) {
      fetchProductDetails(parseInt(id));
    }
    return () => {
      reset(); // Limpa o estado ao sair da tela
    };
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !product) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Error loading product details 😔</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.title || 'Product Details',
          animation: 'slide_from_bottom',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false,
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
                      text1: 'Produto removido dos favoritos!',
                      position: 'bottom',
                    });
                  } else {
                    addToWishlist(product);
                    Toast.show({
                      type: 'success',
                      text1: 'Produto adicionado aos favoritos',
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
        </ThemedView>
      </ScrollView>
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
});
