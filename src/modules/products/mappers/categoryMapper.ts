import { Category } from '../types/category';
import { formatCategoryText } from '../util';

export const categoryMapper = {
  toCategoryList(categories: any): Category[] {
    return categories.map((category: any) => {
      return {
        slug: category.slug,
        name: category.name,
        url: category.url,
        nameWithEmoji: formatCategoryText(category),
      };
    });
  },
};
