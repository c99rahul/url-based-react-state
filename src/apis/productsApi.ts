import {
  APIError,
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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "Unknown error occurred",
    }));
    throw new APIError(
      errorData.message || `HTTP error ${response.status}`,
      response.status
    );
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new APIError("Invalid JSON response from server");
  }
}

export const productsApi = {
  async getAllProducts(params?: ProductsParams) {
    const url = params?.category
      ? `${PRODUCTS_BY_CATEGORY_URL}/${params.category}`
      : PRODUCTS_URL;

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
    return handleResponse<Products>(response);
  },
  async getProductById(id: number) {
    const response = await fetch(`${PRODUCTS_URL}/${id}`);
    return handleResponse<Product>(response);
  },

  async getAllCategories() {
    const response = await fetch(PRODUCTS_CATEGORIES_URL);
    return handleResponse<ProductCategory[]>(response);
  },
};
