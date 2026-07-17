"use client";

import { ProductForm } from "@/features/inventory/schemas";
import { updateProduct } from "@/features/products/services/products.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { productKeys } from "@/lib/queryCacheHelpers";

export function useUpdateProductMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductForm }) =>
      updateProduct({ id, product }),

    onSuccess: () => {
      toast.success(
        "Product updated successfully. Changes are simulated because this project uses DummyJSON.",
      );
      queryClient.invalidateQueries({
        queryKey: productKeys.productsList({}),
      });

      router.refresh();
    },
    // onMutate: async ({ id }) => {
    //   await queryClient.cancelQueries({
    //     queryKey: productKeys.productsList({}),
    //   });
    // },
    onError: () => {
      toast.error("Failed to update product");
    },
  });
}
