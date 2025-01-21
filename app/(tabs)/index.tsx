import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, useColorScheme, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useProductStore } from '@/src/modules/products/store/useProductStore';
import { Product } from '@/src/modules/products/types/product';
import { IconSymbol } from '@/src/ui/components/IconSymbol';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { SortModal, SortOption } from '@/src/ui/components/SortModal';
import { ThemedText } from '@/src/ui/components/ThemedText';
import { ThemedView } from '@/src/ui/components/ThemedView';
import { Colors } from '@/src/ui/theme';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    loadMore,
    removeFilter,
    currentCategory,
    setSortByConfig,
    sortByConfig,
  } = useProductStore();
  const [isGridView, setIsGridView] = useState(true);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, sortByConfig]);

  const handleEndReached = useCallback(
    ({ distanceFromEnd }: { distanceFromEnd: number }) => {
      if (distanceFromEnd > 0 && !loading && hasMore) {
        loadMore();
      }
    },
    [loading, hasMore]
  );

  const renderFooter = useCallback(() => {
    if (!loading || !products.length) return null;

    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={Colors[colorScheme ?? 'light'].tint} />
      </ThemedView>
    );
  }, [loading, products.length, colorScheme]);

  const handleProductPress = useCallback(
    (id: number) => {
      router.push(`/product/${id}`);
    },
    [router]
  );

  const renderGridItem = useCallback(
    ({ item }: { item: Product }) => (
      <PressableScale
        testID={`product-card-${item.id}`}
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <ThemedView style={styles.productInfo}>
          <ThemedText type="defaultSemiBold" numberOfLines={1}>
            {item.title}
          </ThemedText>
          <ThemedText type="default" numberOfLines={2} style={styles.description}>
            {item.description}
          </ThemedText>
          <ThemedView style={styles.bottomRow}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              ${item.price}
            </ThemedText>
            <ThemedView style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={12} color="#FFD700" />
              <ThemedText style={styles.rating}>{item.rating}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </PressableScale>
    ),
    [handleProductPress]
  );

  const renderListItem = useCallback(
    ({ item }: { item: Product }) => (
      <PressableScale
        testID={`product-card-${item.id}`}
        style={styles.listItemCard}
        onPress={() => handleProductPress(item.id)}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.listItemImage} />
        <ThemedView style={styles.listItemInfo}>
          <ThemedText type="defaultSemiBold" numberOfLines={1}>
            {item.title}
          </ThemedText>
          <ThemedText type="default" numberOfLines={2} style={styles.description}>
            {item.description}
          </ThemedText>
          <ThemedView style={styles.bottomRow}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              ${item.price}
            </ThemedText>
            <ThemedView style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={12} color="#FFD700" />
              <ThemedText style={styles.rating}>{item.rating}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </PressableScale>
    ),
    [handleProductPress]
  );

  const renderEmptyList = useCallback(
    () => (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyEmoji}>🔍</ThemedText>
        <ThemedText style={styles.emptyTitle}>No products found</ThemedText>
        <ThemedText style={styles.emptyDescription}>
          Try searching with different criteria
        </ThemedText>
      </ThemedView>
    ),
    []
  );

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Oops! Something went wrong loading the products.
        </ThemedText>
        <PressableScale
          style={styles.retryButton}
          onPress={() => fetchProducts()}
          scaleValue={0.95}
        >
          <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
        </PressableScale>
      </ThemedView>
    );
  }

  const handleSearchPress = useCallback(() => {
    router.push('/search');
  }, [router]);

  const handleSort = (option: SortOption) => {
    setSortByConfig({
      sortBy: option.value,
      order: option.order,
    });
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
    >
      <ThemedView style={styles.header}>
        {currentCategory ? (
          <ThemedView style={styles.categoryTag}>
            <ThemedText style={styles.categoryText}>{currentCategory.nameWithEmoji}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedText style={styles.headerTitle}>MODAK TC</ThemedText>
        )}
        <ThemedView style={styles.headerButtons}>
          <View style={styles.searchButtonContainer}>
            <PressableScale onPress={handleSearchPress} style={styles.headerButton}>
              <IconSymbol name="magnifyingglass" size={24} color={Colors.light.tint} />
            </PressableScale>
            {!!currentCategory && <View style={styles.filterBadge} />}
          </View>
          <PressableScale onPress={() => setIsGridView(!isGridView)} style={styles.headerButton}>
            <IconSymbol
              name={isGridView ? 'square.grid.2x2' : 'list.bullet'}
              size={24}
              color={Colors.light.tint}
            />
          </PressableScale>
          <PressableScale onPress={() => modalizeRef.current?.open()} style={styles.headerButton}>
            <IconSymbol name="arrow.up.arrow.down" size={24} color={Colors.light.tint} />
          </PressableScale>
        </ThemedView>
      </ThemedView>
      <FlatList
        testID="products-grid"
        key={isGridView ? 'grid' : 'list'}
        data={products}
        renderItem={isGridView ? renderGridItem : renderListItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={3}
        numColumns={isGridView ? 2 : 1}
        columnWrapperStyle={isGridView ? styles.row : undefined}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        onRefresh={() => {
          removeFilter();
        }}
        refreshing={loading}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!loading ? renderEmptyList : undefined}
      />
      <SortModal ref={modalizeRef} onSelect={handleSort} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  listContainer: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
  row: {
    gap: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#e7e1d3',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#e7e1d3',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
    gap: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  listItemCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#e7e1d3',
    flexDirection: 'row',
  },
  listItemImage: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  listItemInfo: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  loaderContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  categoryTag: {
    backgroundColor: '#e7e1d3',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
    marginBottom: 2,
  },
  categoryText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: '50%',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
  searchButtonContainer: {
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ec5353',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
