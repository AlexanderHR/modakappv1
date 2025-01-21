import { useCalendar } from '@/src/hooks/useCalendar';
import { useProductDetailsStore } from '@/src/modules/products/store/useProductDetailsStore';
import { useWishlistStore } from '@/src/modules/products/store/useWishlistStore';
import EmojiAmination, { EmojiAnimationRef } from '@/src/ui/components/EmojiAnimation';
import ErrorView from '@/src/ui/components/ErrorView';
import { ImageCarousel } from '@/src/ui/components/ImageCarousel';
import { LoadingView } from '@/src/ui/components/LoadingView';
import MainContainer from '@/src/ui/components/MainContainer';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { ThemedText } from '@/src/ui/components/ThemedText';
import { ThemedView } from '@/src/ui/components/ThemedView';
import { Colors } from '@/src/ui/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const from = params.from as string;
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, loading, error, fetchProductDetails, reset } = useProductDetailsStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const colorScheme = useColorScheme();
  const { addProductReminder } = useCalendar();
  const emojiAnimationRef = useRef<EmojiAnimationRef>(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails(parseInt(id));
    }
    return () => {
      reset();
    };
  }, [id]);

  const handleBack = () => {
    if (from === 'wishlist') {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleAddProductReminder = async () => {
    if (!product) return;
    emojiAnimationRef?.current?.startAnimation();
    const additionalValue = 24 * 60 * 60 * 1000; // 24hs
    const reminderDate = new Date(Date.now() + additionalValue);
    addProductReminder(product, reminderDate);
  };

  const onRefresh = () => {
    if (id) {
      fetchProductDetails(parseInt(id));
    }
  };

  const getScreenTitle = () => {
    if (loading) return 'Loading...';
    if (error) return 'Product not found';
    if (product?.title) return product.title;
    return 'Product Details';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: getScreenTitle(),
          animation: 'simple_push',
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <PressableScale testID="back-button" onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} />
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
        <LoadingView />
      ) : error || !product ? (
        <ErrorView errorDescription="Error loading product details 😔" />
      ) : (
        <MainContainer testID="product-details" loading={loading} onRefresh={onRefresh}>
          <ImageCarousel images={product.images} />
          <ThemedView variant="content">
            <ThemedText style={styles.title}>{product.title}</ThemedText>
            <ThemedText style={styles.brand}>{product.brand}</ThemedText>
            <ThemedText style={styles.price}>${product.price}</ThemedText>
            <ThemedText style={styles.description}>{product.description}</ThemedText>

            <ThemedView variant="container">
              <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
                Rating:
              </ThemedText>
              <ThemedText>{product.rating} ⭐</ThemedText>
            </ThemedView>

            <ThemedView variant="container">
              <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
                Stock:
              </ThemedText>
              <ThemedText>{product.stock} units</ThemedText>
            </ThemedView>

            <ThemedView variant="container">
              <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
                Category:
              </ThemedText>
              <ThemedText>{product.category}</ThemedText>
            </ThemedView>

            <PressableScale style={styles.reminderButton} onPress={handleAddProductReminder}>
              <EmojiAmination ref={emojiAnimationRef} />
              <ThemedText style={styles.buttonText}>Add Purchase Reminder</ThemedText>
            </PressableScale>
          </ThemedView>
        </MainContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 100,
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
});
