import Toast from 'react-native-toast-message';
import CalendarManager from '../native/CalendarManager';
import { Product } from '../products/types/product';

export const useCalendar = () => {
  const addProductReminder = async (product: Product, reminderDate: Date) => {
    try {
      await CalendarManager.addProductReminder(
        `Reminder: Buy ${product.title}`,
        `Don't forget to check out ${product.title} - $${product.price}`,
        reminderDate.getTime()
      );
      Toast.show({
        type: 'success',
        text1: 'Reminder added',
        text2: 'The reminder was added to your calendar 🙂',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to add reminder',
        position: 'bottom',
      });
    }
  };

  return { addProductReminder };
};
