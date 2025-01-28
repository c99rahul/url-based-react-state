import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/apis/productApi";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => productsApi.getAllCategories(),
  });
}
