import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useCategoryStore } from '@/src/products/store/useCategoryStore';
import { useProductStore } from '@/src/products/store/useProductStore';
import { Category } from '@/src/products/types/category';
import { formatCategoryText } from '@/src/products/util';
import { PressableScale } from '@/src/ui/components/PressableScale';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const { setCurrentCategory } = useProductStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleCategorySelect = useCallback(
    (category: Category) => {
      setCurrentCategory(category);
      router.back();
    },
    [setCurrentCategory, router]
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <PressableScale onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={Colors.light.text} />
          </PressableScale>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        {loading ? (
          <ActivityIndicator style={styles.loader} />
        ) : error ? (
          <ThemedText style={styles.errorText}>Error loading categories 😰</ThemedText>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <View style={styles.categoriesWrapper}>
              {categories.map(category => (
                <PressableScale
                  key={category.slug}
                  style={styles.categoryTag}
                  onPress={() => handleCategorySelect(category)}
                >
                  <ThemedText style={styles.categoryText}>
                    {formatCategoryText(category)}
                  </ThemedText>
                </PressableScale>
              ))}
            </View>
          </ScrollView>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  loader: {
    padding: 16,
  },
  errorText: {
    fontWeight: '600',
    padding: 16,
  },
});
