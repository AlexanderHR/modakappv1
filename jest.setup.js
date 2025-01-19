import '@testing-library/jest-native';

// Mock do useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: () => 'light',
}));

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock do expo-router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
  useLocalSearchParams: () => ({ id: '1' }),
}));

// Mock do Toast
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

// Mock do CalendarManager
jest.mock('@/src/native/CalendarManager', () => ({
  __esModule: true,
  default: {
    addProductReminder: jest.fn().mockResolvedValue('Event added successfully'),
  },
}));

// Mock do @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));
