import {
  Product,
  ProductCategory,
  Products,
  ProductsParams,
} from "@/types/product";
import {
  PRODUCTS_BY_CATEGORY_URL,
  PRODUCTS_CATEGORIES_URL,
  PRODUCTS_PER_PAGE,
  PRODUCTS_TO_SKIP,
  PRODUCTS_URL,
} from "@/data/constants";

export const productsApi = {
  async getAllProducts(params?: ProductsParams) {
    const url = params?.category
      ? `${PRODUCTS_BY_CATEGORY_URL}/${params.category}`
      : PRODUCTS_URL;

    console.log(url);

    const queryParams = new URLSearchParams({
      limit: params?.limit?.toString() || PRODUCTS_PER_PAGE.toString(),
      skip: params?.skip?.toString() || PRODUCTS_TO_SKIP.toString(),
    });

    if (params?.sortBy) {
      queryParams.append("sortBy", params.sortBy);
      if (params?.order) {
        queryParams.append("order", params.order);
      }
    }

    const response = await fetch(`${url}?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json() as Promise<Products>;
  },
  async getProductById(id: number) {
    const response = await fetch(`${PRODUCTS_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json() as Promise<Product>;
  },

  async getAllCategories() {
    const response = await fetch(PRODUCTS_CATEGORIES_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch cats");
    }

    return response.json() as Promise<ProductCategory[]>;
  },
};
