// useProducts.ts
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "@/apis/productApi";
import { Product } from "@/types/product";

export function useProducts(limit: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(total / limit);

  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order") as "asc" | "desc" | null;
  const category = searchParams.get("category");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * limit;
      const data = await productsApi.getAllProducts({
        limit,
        skip,
        sortBy: sortBy || null,
        order,
        category,
      });

      setProducts(data.products);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setProducts([]);
      setTotal(0);
      setError(new Error(`Failed to load products: ${err}`));
    } finally {
      setLoading(false);
    }
  }, [limit, currentPage, sortBy, order, category]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.set("page", page.toString());
          return params;
        });
      }
    },
    [totalPages, setSearchParams]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
    goToNext: () => currentPage < totalPages && goToPage(currentPage + 1),
    goToPrevious: () => currentPage > 1 && goToPage(currentPage - 1),
  };
}
