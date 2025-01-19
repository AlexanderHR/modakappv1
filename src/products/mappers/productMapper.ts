import { Product } from '../types/product';

interface RawProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const productMapper = {
  toProduct(raw: RawProduct): Product {
    return {
      id: raw.id,
      title: raw.title,
      description: raw.description,
      price: raw.price,
      thumbnail: raw.thumbnail,
    };
  },

  toProductList(rawList: RawProduct[]): Product[] {
    return rawList.map(this.toProduct);
  },
};
