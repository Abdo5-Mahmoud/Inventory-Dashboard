import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategoriesList } from "../features/products/services/products.service";

export function useCategoryList() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategoriesList(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}
