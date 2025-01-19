import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const renderImage = useCallback(
    ({ item: uri }: { item: string }) => (
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    ),
    []
  );

  const renderDot = useCallback(
    (index: number) => (
      <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
    ),
    [activeIndex]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <View style={styles.pagination}>{images.map((_, index) => renderDot(index))}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 0.8,
    backgroundColor: '#e7e1d3',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.8,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 16,
  },
});
