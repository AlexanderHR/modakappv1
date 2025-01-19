import { create } from 'zustand';
import { ProductService } from '../services/api';
import { Category } from '../types/category';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const data = await ProductService.fetchCategories();
      const sortedCategories = [...data].sort((a, b) => a.name.localeCompare(b.name));
      set({ categories: sortedCategories, loading: false });
    } catch {
      set({ error: 'Error loading categories', loading: false });
    }
  },
}));
