import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "@/apis/productsApi";
import { Product } from "@/types/product";

export function useProduct() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null); // Fixed initial state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const productId = Number(searchParams.get("id"));

  const fetchProduct = useCallback(async () => {
    try {
      if (!productId || isNaN(productId)) {
        throw new Error("Invalid product ID provided");
      }
      setLoading(true);
      setError(null);

      const data = await productsApi.getProductById(productId);
      if (!data) {
        throw new Error("Product not found");
      }

      setProduct(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unable to load product details")
      );
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
  };
}
