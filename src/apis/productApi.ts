// productsApi.ts
import { PAGINATION_CONFIG } from "@/config/pagination";
import {
  Product,
  ProductCategory,
  ProductsQueryParams,
  ProductsResponse,
} from "@/types/product";
import {
  getCategoriesUrl,
  getCategoryProductsUrl,
  getProductsUrl,
  getProductUrl,
} from "@/utils/getApiUrls";

export const productsApi = {
  async getProducts(params?: ProductsQueryParams) {
    const queryParams = new URLSearchParams();

    // Add pagination params
    queryParams.append(
      "limit",
      (params?.limit ?? PAGINATION_CONFIG.ITEMS_PER_PAGE).toString()
    );
    queryParams.append(
      "skip",
      (params?.skip ?? PAGINATION_CONFIG.INITIAL_ITEMS_TO_SKIP).toString()
    );

    // Add optional sort params
    if (params?.sortBy && params?.order) {
      queryParams.append("sortBy", params.sortBy);
      queryParams.append("order", params.order);
    }

    const url = params?.category
      ? getCategoryProductsUrl(params.category)
      : getProductsUrl();

    const response = await fetch(`${url}?${queryParams}`);
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load products.`
      );
    }

    return response.json() as Promise<ProductsResponse>;
  },

  async getProductById(id: number) {
    const response = await fetch(getProductUrl(id));
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load the product.`
      );
    }

    return response.json() as Promise<Product>;
  },

  async getAllCategories() {
    const response = await fetch(getCategoriesUrl());
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status}; failed to load categories.`
      );
    }

    return response.json() as Promise<ProductCategory[]>;
  },
};
