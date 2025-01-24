export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string | null;
  order?: "asc" | "desc" | null;
  category?: string | null;
}

export type ProductCategory = string;

export type ProductSortFields =
  | "price"
  | "title"
  | "rating"
  | "createdAt"
  | "updatedAt"
  | "stock";
