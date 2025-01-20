import { create } from 'zustand';
import { categoryMapper } from '../mappers/categoryMapper';
import { categoriesService } from '../services/categoriesService';
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
      const response = await categoriesService.getCategories();

      const data = categoryMapper
        .toCategoryList(response)
        .sort((a, b) => a.name.localeCompare(b.name));
      set({ categories: data, loading: false });
    } catch {
      set({ error: 'Error loading categories', loading: false });
    }
  },
}));
