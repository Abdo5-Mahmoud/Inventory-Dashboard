"use server";

import { redirect } from "next/navigation";
import { ProductType } from "../types/product.type";

export async function changeLimit({ newLimit }: { newLimit: number }) {
  if (!newLimit) return;
  redirect(`/products?page=${1}&limit=${newLimit}`);
}
