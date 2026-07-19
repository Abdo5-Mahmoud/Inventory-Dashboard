export const productKeys = {
  all: ["inventory"],
  productsList: ({
    skip = 0,
    limit = 12,
    sortBy = "title",
    order = "asc",
    category = "",
  }: {
    skip?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    category?: string;
  }) => [...productKeys.all, "list", skip, limit, sortBy, order, category],
  productsSearch: ({
    skip,
    limit,
    search,
  }: {
    skip: number;
    limit?: number;
    search: string;
  }) => [...productKeys.all, skip, limit, search],
};
