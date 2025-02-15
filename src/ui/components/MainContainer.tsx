import { ReactNode } from 'react';
import { RefreshControl, ScrollView, useColorScheme } from 'react-native';
import { Colors } from '../theme';

type Props = { loading: boolean; onRefresh: () => void; children: ReactNode; testID?: string };

export default function MainContainer({ loading, onRefresh, children, testID }: Props) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
      style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}
      testID={testID}
    >
      {children}
    </ScrollView>
  );
}
