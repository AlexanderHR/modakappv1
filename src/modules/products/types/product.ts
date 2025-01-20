export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
}

export interface ProductDetails extends Product {
  images: string[];
  brand: string;
  rating: number;
  stock: number;
  category: string;
}

export interface SortByConfig {
  sortBy: string;
  order: 'asc' | 'desc';
}
