// useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "@/apis/productApi";
import { useCallback } from "react";

export function useProducts(limit: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order") as "asc" | "desc" | null;
  const category = searchParams.get("category");

  const skip = (currentPage - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", { limit, skip, sortBy, order, category }],
    queryFn: () =>
      productsApi.getProducts({
        limit,
        skip,
        sortBy: sortBy || null,
        order,
        category,
      }),
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

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

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
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
