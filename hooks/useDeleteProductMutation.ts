"use client";
import { deleteProduct } from "@/features/inventory/services/product.service";
import { productKeys } from "@/lib/queryCacheHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProduct({ id }),
    onSuccess: () => {
      toast.success(
        "Product deleted successfully. Changes are simulated because this project uses DummyJSON.",
      );
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      router.push("/inventory");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });
}
