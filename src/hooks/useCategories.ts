import { useCallback, useEffect, useState } from "react";
import { productsApi } from "@/apis/productApi";
import { ProductCategory } from "@/types/product";

export function useCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(new Error(`Failed to load categories: ${err}`));
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
  };
}
