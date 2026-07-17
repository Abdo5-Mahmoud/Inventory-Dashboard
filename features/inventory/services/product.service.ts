import { ProductType } from "@/features/products/types/product.type";
import { env } from "@/lib/env";

export const getProductById = async ({
  id,
}: {
  id: string;
}): Promise<ProductType> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`);
  if (!response.ok)
    throw new Error("Faild to fetch product data from dummyjson");
  const data = await response.json();
  return data;
};

export const deleteProduct = async ({ id }: { id: number }) => {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res;
};
