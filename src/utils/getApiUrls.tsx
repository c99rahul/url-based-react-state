import { API_CONFIG } from "@/config/api";

export const getProductsUrl = () =>
  API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.PRODUCTS);

export const getCategoriesUrl = () =>
  API_CONFIG.buildUrl(`${API_CONFIG.ENDPOINTS.PRODUCT_CATEGORIES}`);

export const getCategoryProductsUrl = (category: string) =>
  API_CONFIG.buildUrl(
    `${API_CONFIG.ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`
  );

export const getProductUrl = (id: number) =>
  API_CONFIG.buildUrl(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
