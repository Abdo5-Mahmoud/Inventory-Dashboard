import { searchProducts } from "@/features/products/services/products.service";
import { productKeys } from "@/lib/queryCacheHelpers";
import { useQuery } from "@tanstack/react-query";

export function useSearchList(search: string) {
  return useQuery({
    queryKey: productKeys.productsSearch({ skip: 0, search }),
    queryFn: () => searchProducts({ name: search, skip: 0, limit: 10 }),
    staleTime: 1000 * 60 * 5,
    enabled: !!search,
  });
}
