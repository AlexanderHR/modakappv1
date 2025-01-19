import { CATEGORY_EMOJIS } from '@/src/products/constants/categoryEmojis';
import { Category } from './types/category';

export const formatCategoryText = (category: Category): string => {
  const emoji = CATEGORY_EMOJIS[category.slug] || '🔍';
  return `${category.name} ${emoji}`;
};
