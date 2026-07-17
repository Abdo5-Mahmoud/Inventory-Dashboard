"use client";
import { changeLimit } from "@/features/products/actions/action";

export function SelectClient({ limit }: { limit: number }) {
  return (
    <select
      value={limit}
      className="p-1 bg-gray-100 text-black rounded-md border border-gray-200"
      name="productsPerPage"
      id="productsPerPage"
      onChange={(e) => changeLimit({ newLimit: Number(e.target.value) })}
    >
      <option value="12">12</option>
      <option value="15">15</option>
      <option value="18">18</option>
      <option value="21">21</option>
      <option value="24">24</option>
    </select>
  );
}
