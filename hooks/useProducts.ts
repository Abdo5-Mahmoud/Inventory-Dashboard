import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../features/products/services/products.service";
import { productKeys } from "@/lib/queryCacheHelpers";

export function useProducts({
  limit = 12,
  skip = 0,
  sortBy,
  order,
  category,
}: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
}) {
  return useQuery({
    queryKey: productKeys.productsList({
      skip,
      limit,
      sortBy,
      order,
      category,
    }),
    queryFn: async () => getProducts({ limit, skip, sortBy, order, category }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}
