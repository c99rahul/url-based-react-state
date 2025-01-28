// config/api.js
export const API_CONFIG = {
  BASE_URL: "https://dummyjson.com",
  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCTS_BY_CATEGORY: "/products/category",
    PRODUCT_CATEGORIES: "/products/categories",
  },
  buildUrl: (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`,
};
