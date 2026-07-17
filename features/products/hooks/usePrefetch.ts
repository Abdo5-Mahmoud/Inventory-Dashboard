import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "../services/products.service";
import { productKeys } from "@/lib/queryCacheHelpers";

export function usePrefetch({
  limit,
  skip,
  pageNumber,
  totalPages,
}: {
  limit: number;
  skip: number;
  pageNumber: number;
  totalPages: number;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextSkip = skip + limit;
    if (pageNumber < totalPages) {
      queryClient.prefetchQuery({
        queryKey: productKeys.productsList({
          skip: nextSkip,
          limit: Number(limit),
        }),
        queryFn: () => getProducts({ limit: Number(limit), skip: nextSkip }),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [limit, skip, totalPages, pageNumber]);
}
