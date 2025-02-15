import { create } from 'zustand';
import { productMapper } from '../mappers/productMapper';
import { ProductService } from '../services/productService';
import { Category } from '../types/category';
import { Product, SortByConfig } from '../types/product';

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
  sortByConfig: SortByConfig;
  // eslint-disable-next-line no-unused-vars
  setSortByConfig: (sortByConfig: SortByConfig) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0,
  currentCategory: undefined,
  sortByConfig: {
    sortBy: '',
    order: 'asc',
  },
  fetchProducts: async () => {
    try {
      const state = get();
      set({ loading: true, error: null });
      const response = await ProductService.getProducts(
        0,
        10,
        state.currentCategory?.slug,
        state.sortByConfig
      );
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
      const response = await ProductService.getProducts(
        nextPage * 10,
        10,
        state.currentCategory?.slug,
        state.sortByConfig
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
  setSortByConfig: (sortByConfig: SortByConfig) => {
    set({ sortByConfig });
  },
}));
