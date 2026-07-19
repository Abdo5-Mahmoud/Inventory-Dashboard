import { ProductForm } from "@/features/inventory/schemas";
import {
  CategoryType,
  ProductsDataType,
} from "@/features/products/types/product.type";
import { env } from "@/lib/env";

export async function getProducts({
  limit = 12,
  skip = 0,
  sortBy = "title",
  order = "asc",
  category = "",
}: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
}): Promise<ProductsDataType> {
  let url = `${env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
  if (category) {
    url = `${env.NEXT_PUBLIC_API_URL}/products/category/${category}`;
  }
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok)
    throw new Error("Faild to fetch products data from dummyjson");
  const data = await response.json();
  return data;
}

export async function searchProducts({
  name,
  limit = 12,
  skip = 0,
}: {
  name?: string;
  limit?: number;
  skip?: number;
}): Promise<ProductsDataType> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products/search?q=${name}&limit=${limit}&skip=${skip}`,
  );
  if (!response.ok)
    throw new Error("Faild to fetch products data from dummyjson");
  const data = await response.json();
  return data;
}

export async function getCategoriesList(): Promise<CategoryType[]> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products/categories`,
  );
  if (!response.ok)
    throw new Error("Faild to fetch products data from dummyjson");
  const data = await response.json();
  return data;
}

export async function getProductsCategory({ category }: { category: string }) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products/category/${category}`,
  );
  if (!response.ok)
    throw new Error("Faild to fetch products data from dummyjson");
  const data = await response.json();
  return data;
}

export async function updateProduct({
  id,
  product,
}: {
  id: number;
  product: ProductForm;
}) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok)
    throw new Error("Faild to update product data from dummyjson");
  const data = await response.json();

  return data;
}

export async function createProduct(product: ProductForm) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok)
    throw new Error("Faild to create product data from dummyjson");
  const data = await response.json();
  return data;
}
