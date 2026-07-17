import { env } from "@/lib/env";
import { OrderDataType, OrderType } from "../types/ordersType";

export async function getAllCarts(): Promise<OrderDataType> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/carts`);
  if (!response.ok) throw new Error("Faild to fetch carts data from dummyjson");
  const data = await response.json();
  return data;
}

export async function getCartById({ id }: { id: number }): Promise<OrderType> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/carts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch cart data from dummyjson");
  const data = await response.json();
  return data;
}
