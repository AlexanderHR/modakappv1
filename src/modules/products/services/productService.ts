import dummyjsonApi from '@/src/api/dummyjsonApi';
import { SortByConfig } from '../types/product';

export const ProductService = {
  async getProducts(
    skip: number = 0,
    limit: number = 10,
    categorySlug?: string,
    sortByConfig?: SortByConfig
  ): Promise<any> {
    const baseUrl = categorySlug ? `/products/category/${categorySlug}` : '/products';

    const { sortBy, order } = sortByConfig ?? {};

    const response = await dummyjsonApi.get(baseUrl, {
      params: {
        limit,
        skip,
        ...(sortBy && { sortBy, order }),
      },
    });
    return response.data;
  },

  async getProductDetails(id: number) {
    const response = await dummyjsonApi.get(`/products/${id}`);
    return response.data;
  },
};
