import { NativeModules, Platform } from 'react-native';

interface CalendarManagerInterface {
  // eslint-disable-next-line no-unused-vars
  addProductReminder(title: string, description: string, date: number): Promise<string>;
}

const { CalendarManager } = NativeModules;

console.log('CalendarManager:', CalendarManager);

if (!CalendarManager) {
  throw new Error(
    'CalendarManager native module is not available. Did you run pod install and rebuild the app?'
  );
}

export default Platform.select({
  ios: CalendarManager,
  default: {
    addProductReminder: () => Promise.reject('Calendar reminders are only available on iOS'),
  },
}) as CalendarManagerInterface;
