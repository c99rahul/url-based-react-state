import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/apis/productApi";
import { Product } from "@/types/product";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { id } = useParams();
  const productId = Number(id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => {
      if (!productId || isNaN(productId)) {
        throw new Error("Invalid product ID");
      }
      return productsApi.getProductById(productId);
    },
    enabled: Boolean(productId) && !isNaN(productId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry for invalid product ID
      if (error.message === "Invalid product ID") return false;
      return failureCount < 3;
    },
  });

  return {
    product: product || null,
    loading: isLoading,
    error,
  };
}
