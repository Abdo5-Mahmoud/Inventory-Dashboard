import { ReadonlyURLSearchParams } from "next/navigation";

export function createQueryString({
  params,
  path,
  limit,
  category,
  sortBy,
  order,
  page,
}: {
  params: URLSearchParams;
  path: string;
  limit?: number;
  page?: number;
  category?: string;
  sortBy?: string;
  order?: string;
}) {
  const newParams = new URLSearchParams(params);
  newParams.set("limit", limit?.toString() ?? "12");
  newParams.set("category", category ?? "");
  newParams.set("sortBy", sortBy ?? "title");
  newParams.set("order", order ?? "asc");
  newParams.set("page", page?.toString() ?? "1");

  return `${path}?${newParams.toString()}`;
}

export function getFilters({ params }: { params: ReadonlyURLSearchParams }) {
  return {
    page: Number(params.get("page") || "1"),
    limit: Number(params.get("limit") || "12"),
    category: params.get("category") || "",
    sortBy: params.get("sortBy") || "title",
    order: (params.get("order") || "asc") as "asc" | "desc",
    params: params,
    skip:
      (Number(params.get("page") || "1") - 1) *
      Number(params.get("limit") || "12"),
  };
}
