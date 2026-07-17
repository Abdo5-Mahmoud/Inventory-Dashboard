"use client";
import { PaginationUi } from "@/components/pagination/PaginationUi";
import { SelectModel } from "@/components/SelectModel";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/error-state";
import { useCategoryList } from "@/hooks/useCategoryList";
import { getCategoriesListData } from "@/lib/productsHelpers";
import { createQueryString, getFilters } from "@/lib/url-helpers";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useProducts } from "../../../hooks/useProducts";
import { CardComponent } from "./CardComponent";
import { FilterCategoriesModel } from "./FilterCategoriesModel";
import { ProductsLoadingSkeleton } from "./ProductCardSkeleton";
import { SortModel } from "./SortModel";

const PAGE_LIMIT_OPTIONS = [
  { value: "12", text: "12" },
  { value: "24", text: "24" },
  { value: "48", text: "48" },
  { value: "96", text: "96" },
];
export default function ProductsClient({ skip }: { skip: number }) {
  const path = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const paramsFilter = getFilters({ params });
  const { limit, category, sortBy, order } = paramsFilter;
  const {
    isPending: productsPending,
    data,
    error: productsError,
    isFetching: productsIsFetching,
  } = useProducts({
    limit: Number(limit),
    skip,
    sortBy,
    order,
    category,
  });
  const { data: categories, isPending: categoryPending } = useCategoryList();

  // Prepare categories for SelectModel
  const CategoriesData = getCategoriesListData(categories ?? []);

  // Extract products from data
  const products = data?.products ?? [];

  // Calculate total inventory value
  // const totalInventoryValue = getTotalInventoryValue(products);

  // Calculate total pages for pagination
  const totalPages = Math.ceil((data?.total ?? 0) / Number(limit));
  // Calculate current page number
  const pageNumber = (skip / Number(limit) + 1 || 1).toString();

  // filter by category function
  const filterByCategory = useCallback(
    (category: string) => {
      category == "all"
        ? router.push(
            `${createQueryString({ category: "", params, path, limit })}`,
          )
        : router.push(
            `${createQueryString({ category, params, path, limit })}`,
          );
    },
    [params, path, router],
  );
  const sortProducts = useCallback(
    (sortBy: string) => {
      if (category) return;
      router.push(`${createQueryString({ sortBy, params, path, limit })}`);
    },
    [category, params, path, router],
  );
  const orderProducts = useCallback(
    (order: string) => {
      if (category) return;
      router.push(`${createQueryString({ order, params, path, limit })}`);
    },
    [category, params, path, router],
  );

  // Error state
  if (productsError) {
    return <ErrorState error={productsError} title="Error Fetching Products" />;
  }
  // Empty state
  if (!products.length) return <EmptyState msg="no products" />;

  // Main return
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* sticky bar */}
        <div className="sticky top-0 z-10 py-2 bg-background">
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 items-center md:gap-2">
              <p className="font-medium text-foreground">Filter By Category:</p>
              <FilterCategoriesModel
                categoryItems={CategoriesData}
                func={filterByCategory}
                active={category}
              />
            </div>
            {totalPages > 1 && (
              <SortModel
                sortFunction={sortProducts}
                activeValue={sortBy}
                icon={
                  order == "desc" ? (
                    <button onClick={() => orderProducts("asc")}>
                      <ArrowUpIcon className="size-5" />
                    </button>
                  ) : (
                    <button onClick={() => orderProducts("desc")}>
                      <ArrowDownIcon className="size-5" />
                    </button>
                  )
                }
              />
            )}
            {totalPages > 1 && (
              <SelectModel
                label="Per Page :"
                items={PAGE_LIMIT_OPTIONS}
                func={(value) => {
                  router.push(
                    `${createQueryString({ limit: Number(value), params, path })}`,
                  );
                }}
              />
            )}
          </div>
        </div>

        {/* products grid */}
        <div
          className={cn(
            "grid",
            "grid-cols-1",
            "md:grid-cols-2",
            "lg:grid-cols-3",
            "gap-4",
            "justify-items-center",
            "pb-12",
          )}
        >
          {productsPending || productsIsFetching ? (
            <ProductsLoadingSkeleton limit={limit} />
          ) : (
            <>
              {products.map((product, i) => {
                return (
                  <CardComponent product={product} key={product.id} index={i} />
                );
              })}
            </>
          )}
        </div>
        <div className="flex justify-center py-8">
          <PaginationUi
            pageNumber={pageNumber}
            paramsFilter={paramsFilter}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
