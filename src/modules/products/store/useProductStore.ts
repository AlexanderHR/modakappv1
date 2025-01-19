import { create } from 'zustand';
import { productMapper } from '../mappers/productMapper';
import { ProductService } from '../services/api';
import { Category } from '../types/category';
import { Product } from '../types/product';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  currentCategory?: Category;
  fetchProducts: () => Promise<void>;
  loadMore: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setCurrentCategory: (category_: Category) => void;
  removeFilter: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
  currentCategory: undefined,

  fetchProducts: async () => {
    try {
      const state = get();
      set({ loading: true, error: null });
      const response = await ProductService.fetchProducts(0, 10, state.currentCategory?.slug);
      const data = productMapper.toProductResponse(response);
      set({
        products: data.products,
        loading: false,
        hasMore: data.total > data.products.length,
        page: 0,
      });
    } catch {
      set({ error: 'Error loading products', loading: false });
    }
  },

  loadMore: async () => {
    const state = get();
    if (state.loading || !state.hasMore) return;

    try {
      set({ loading: true });
      const nextPage = state.page + 1;
      const response = await ProductService.fetchProducts(
        nextPage * 10,
        10,
        state.currentCategory?.slug
      );
      const data = productMapper.toProductResponse(response);
      set({
        products: [...state.products, ...data.products],
        loading: false,
        hasMore: data.total > state.products.length + data.products.length,
        page: nextPage,
      });
    } catch {
      set(state => ({ ...state, loading: false }));
    }
  },
  setCurrentCategory: (category?: Category) => {
    set({ currentCategory: category });
  },
  removeFilter: () => {
    set({ currentCategory: undefined });
  },
}));
