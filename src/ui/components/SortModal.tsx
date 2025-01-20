import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { PressableScale } from './PressableScale';
import { ThemedText } from './ThemedText';

export type SortOption = {
  label: string;
  value: string;
  order: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { label: '💰 Highest Price ⬆️', value: 'price', order: 'desc' },
  { label: '💰 Lowest Price ⬇️', value: 'price', order: 'asc' },
  { label: '🌟 Best Rating ⬆️', value: 'rating', order: 'desc' },
  { label: '🌟 Worst Rating ⬇️', value: 'rating', order: 'asc' },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: SortOption) => void;
};

export const SortModal = forwardRef<IHandles, Props>(({ onSelect }, ref) => {
  const handleSelect = (option: SortOption) => {
    onSelect(option);
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  return (
    <Modalize ref={ref} adjustToContentHeight handleStyle={styles.handle} modalStyle={styles.modal}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Sort by</ThemedText>
        {sortOptions.map(option => (
          <PressableScale
            key={`${option.value}-${option.order}`}
            style={styles.option}
            onPress={() => handleSelect(option)}
          >
            <ThemedText>{option.label}</ThemedText>
          </PressableScale>
        ))}
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  handle: {
    backgroundColor: '#e7e1d3',
  },
  modal: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    marginBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e1d3',
  },
});
