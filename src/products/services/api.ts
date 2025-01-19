import { Category } from '../types/category';
import { ProductDetails, ProductResponse } from '../types/product';

export const ProductService = {
  async fetchProducts(
    skip: number = 0,
    limit: number = 10,
    categorySlug?: string
  ): Promise<ProductResponse> {
    try {
      const baseUrl = categorySlug
        ? `https://dummyjson.com/products/category/${categorySlug}`
        : 'https://dummyjson.com/products';

      const response = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);

      if (!response.ok) {
        throw new Error('Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) throw new Error('Request failed');
      return response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async fetchProductDetails(id: number): Promise<ProductDetails> {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error('Request failed');
      return response.json();
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  },
};
