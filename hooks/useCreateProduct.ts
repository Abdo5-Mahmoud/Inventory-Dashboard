"use client";
import { ProductForm } from "@/features/inventory/schemas";
import { createProduct } from "@/features/products/services/products.service";
import { productKeys } from "@/lib/queryCacheHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductForm) => createProduct(product),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({
        queryKey: [...productKeys.productsList({})],
      });
    },
    onError: (err) => {
      // throw err;
      toast.error("Failed to create product");
    },
  });
}
