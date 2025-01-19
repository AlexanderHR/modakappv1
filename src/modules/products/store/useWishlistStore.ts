import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface WishlistState {
  items: Product[];
  // eslint-disable-next-line no-unused-vars
  addToWishlist: (product: Product) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromWishlist: (productId: number) => void;
  // eslint-disable-next-line no-unused-vars
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: product => {
        set(state => ({
          items: [...state.items, product],
        }));
      },

      removeFromWishlist: productId => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },

      isInWishlist: productId => {
        return get().items.some(item => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ items: state.items }),
    }
  )
);
