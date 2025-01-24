// productsApi.ts
import {
  Product,
  ProductCategory,
  Products,
  ProductsParams,
} from "@/types/product";
import {
  PRODUCTS_URL,
  PRODUCTS_PER_PAGE,
  PRODUCTS_TO_SKIP,
} from "@/data/constants";

export const productsApi = {
  async getProducts(params?: ProductsParams) {
    const queryParams = new URLSearchParams({
      limit: (params?.limit ?? PRODUCTS_PER_PAGE).toString(),
      skip: (params?.skip ?? PRODUCTS_TO_SKIP).toString(),
    });

    if (params?.sortBy && params?.order) {
      queryParams.append("sortBy", params.sortBy);
      queryParams.append("order", params.order);
    }

    const url = params?.category
      ? `${PRODUCTS_URL}/category/${params.category}`
      : PRODUCTS_URL;

    const response = await fetch(`${url}?${queryParams}`);
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load products.`
      );
    }

    return response.json() as Promise<Products>;
  },

  async getProductById(id: number) {
    const response = await fetch(`${PRODUCTS_URL}/${id}`);
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load the product.`
      );
    }

    return response.json() as Promise<Product>;
  },

  async getAllCategories() {
    const response = await fetch(`${PRODUCTS_URL}/categories`);
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load categories.`
      );
    }

    return response.json() as Promise<ProductCategory[]>;
  },
};
