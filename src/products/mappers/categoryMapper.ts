import { Category } from '../types/category';

export const categoryMapper = {
  toCategory(name: string): Category {
    return name;
  },

  toCategoryList(categories: string[]): Category[] {
    return categories.map(name => this.toCategory(name));
  },
};
