import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "@/apis/productsApi";
import { Product, ProductSortFields } from "@/types/product";

const VALID_SORT_FIELDS: ProductSortFields[] = ["price", "title", "rating"];

export function useProducts(limit: number) {
  if (limit <= 0) {
    throw new Error("Products per page must be a positive number");
  }

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
      if (!Number.isInteger(page) || page < 1) {
        setError(new Error("Invalid page number requested"));
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const skip = (page - 1) * limit;
        const data = await productsApi.getAllProducts({
          limit,
          skip,
          sortBy: VALID_SORT_FIELDS.includes(sortBy as ProductSortFields)
            ? sortBy
            : null,
          order,
          category,
        });

        if (!data?.products?.length && currentPage > 1) {
          goToPage(1);
          return;
        }

        setProducts(data?.products || []);
        setTotal(data?.total || 0);
      } catch (err) {
        setProducts([]);
        setTotal(0);
        setError(
          err instanceof Error
            ? err
            : new Error("Unable to load products. Please try again")
        );
      } finally {
        setLoading(false);
      }
    },
    [limit, sortBy, order, category, currentPage]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (!Number.isInteger(page)) {
        setError(new Error("Invalid page number"));
        return;
      }

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
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      goToPage(totalPages);
    }
  }, [currentPage, totalPages, goToPage]);

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
