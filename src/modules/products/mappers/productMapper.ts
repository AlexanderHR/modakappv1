import { Product, ProductDetails, ProductResponse } from '../types/product';

export const productMapper = {
  toProduct(raw: any): Product {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      price: raw.price,
      thumbnail: raw.thumbnail,
      rating: raw.rating,
    };
  },

  toProductList(rawList: any[]): Product[] {
    return rawList.map(this.toProduct);
  },

  toProductResponse(raw: any): ProductResponse {
    return {
      products: this.toProductList(raw.products),
      total: raw.total,
    };
  },

  toProductDetailsResponse(raw: any): ProductDetails {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      price: raw.price,
      thumbnail: raw.thumbnail,
      images: raw.images,
      brand: raw.brand,
      rating: raw.rating,
      stock: raw.stock,
      category: raw.category,
    };
  },
};
