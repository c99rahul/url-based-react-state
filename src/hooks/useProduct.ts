import { productsApi } from "@/apis/productsApi";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useProduct() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const productId = Number(searchParams.get("id"));

  const fetchProduct = useCallback(async () => {
    try {
      if (!productId) {
        throw new Error("Product Id is required");
      }
      setLoading(true);
      const data = await productsApi.getProductById(productId);
      setProduct(data);
      console.log(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch rpoducts")
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
    refetch: fetchProduct,
  };
}
