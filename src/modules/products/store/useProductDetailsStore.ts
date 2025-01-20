import { create } from 'zustand';
import { productMapper } from '../mappers/productMapper';
import { ProductService } from '../services/productService';
import { ProductDetails } from '../types/product';

type State = {
  product: ProductDetails | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  // eslint-disable-next-line no-unused-vars
  fetchProductDetails: (id: number) => Promise<void>;
  reset: () => void;
};

export const useProductDetailsStore = create<State & Actions>()(set => ({
  product: null,
  loading: false,
  error: null,

  fetchProductDetails: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await ProductService.getProductDetails(id);
      const data = productMapper.toProductDetailsResponse(response);

      set({ product: data, loading: false });
    } catch {
      set({ error: 'Error loading product details', loading: false });
    }
  },

  reset: () => {
    set({ product: null, loading: false, error: null });
  },
}));
