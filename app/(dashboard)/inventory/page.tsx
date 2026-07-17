import { MatricCards } from "@/components/MatricCards";
import { SearchComponent } from "@/components/ui/SearchComponent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CreateProduct } from "@/features/inventory/components/CreateProduct";
import { ProductsLoadingSkeleton } from "@/features/products/components/ProductCardSkeleton";
import ProductsClient from "@/features/products/components/ProductsClient";
import { getProducts } from "@/features/products/services/products.service";
import { productKeys } from "@/lib/queryCacheHelpers";
import { cn } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export const metadata = { title: "Inventory" };

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    limit: string;
    sortBy: string;
    order: "asc" | "desc";
    category: string;
  }>;
}) {
  const {
    page: pageNumber = "1",
    limit = "12",
    sortBy,
    order,
    category,
  } = await searchParams;
  const skip = (Number(pageNumber) - 1) * Number(limit) || 0;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: productKeys.productsList({
      skip,
      limit: Number(limit),
      sortBy: sortBy || "title",
      order: order || "asc",
      category: category || "",
    }),
    queryFn: () =>
      getProducts({
        limit: Number(limit),
        skip: Number(skip),
        sortBy: sortBy || "title",
        order: order || "asc",
        category: category || "",
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section
      className={cn(
        "bg-background",
        "flex-1",
        "min-h-0",
        "max-w-full",
        "px-4 pt-6",
        "md:px-6",
      )}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={cn("flex flex-col gap-6", "flex-1")}>
          {/* Header Section */}

          <SectionHeader>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between">
                <h1 className="text-3xl md:text-[32px] tracking-[-0,32] leading-10 font-semibold flex-1">
                  Products
                </h1>
                <div className="flex flex-col flex-1 gap-2 items-center">
                  <CreateProduct />
                  <SearchComponent className="w-full" />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="leading-6">
                  Optimized for Enterprise Supply Chain
                </p>
              </div>
            </div>
          </SectionHeader>

          {/* metrics cards */}

          <MatricCards
            totalProducts={true}
            InventoryValue={true}
            showCategories={true}
          />
          <Suspense
            fallback={<ProductsLoadingSkeleton limit={Number(limit)} />}
          >
            <ProductsClient skip={skip} />
          </Suspense>
        </div>
      </HydrationBoundary>
    </section>
  );
}
