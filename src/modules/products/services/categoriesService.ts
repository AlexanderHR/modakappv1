import { fetchWithCache } from '@/src/api/dummyjsonApi';

export const categoriesService = {
  async getCategories() {
    const response = await fetchWithCache({
      url: '/products/categories',
      ttl: 1000 * 60 * 5, // 5min
    });
    return response;
  },
};
