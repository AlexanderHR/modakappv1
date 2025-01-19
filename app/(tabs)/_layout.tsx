import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name={focused ? 'house.fill' : 'house'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol size={28} name={focused ? 'heart.fill' : 'heart'} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
