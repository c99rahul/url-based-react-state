import { productsApi } from "@/apis/productApi";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export function useProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      const productId = Number(id);

      if (!productId || isNaN(productId)) {
        throw new Error("Invalid product ID");
      }

      setLoading(true);
      setError(null);
      const data = await productsApi.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(new Error(`Failed to load product: ${err}`));
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error };
}
