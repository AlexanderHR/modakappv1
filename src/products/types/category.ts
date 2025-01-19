export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CategoryResponse {
  categories: Category[];
}
