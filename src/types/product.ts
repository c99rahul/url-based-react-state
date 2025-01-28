export type Product = {
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
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductsQueryParams = {
  limit?: number;
  skip?: number;
  sortBy?: string | null;
  order?: "asc" | "desc" | null;
  category?: string | null;
};

export type ProductCategory = {
  name?: string;
  slug?: string;
};

export type ProductSortFields =
  | "price"
  | "title"
  | "rating"
  | "createdAt"
  | "updatedAt"
  | "stock";
