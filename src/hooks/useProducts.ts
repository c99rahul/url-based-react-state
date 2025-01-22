import { productsApi } from "@/apis/productsApi";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useProducts(limit: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(total / limit);
  const currentPage = Number(searchParams.get("page")) || 1;

  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order") as "asc" | "desc" | null;
  const category = searchParams.get("category") as string | null;

  const fetchProducts = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const skip = (page - 1) * limit;
        const data = await productsApi.getAllProducts({
          limit,
          skip,
          sortBy,
          order,
          category,
        });
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch rpoducts")
        );
      } finally {
        setLoading(false);
      }
    },
    [limit, sortBy, order, category]
  );

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

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

  const goToNext = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevious = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    products,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    goToNext,
    goToPrevious,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
  };
}
