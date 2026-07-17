import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllCarts } from "../features/orders/services/orders.service";
import { OrderDataType } from "../features/orders/types/ordersType";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getAllCarts(),

    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}
