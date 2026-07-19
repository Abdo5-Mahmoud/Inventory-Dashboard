"use client";

import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { ProductCartType } from "@/features/orders/types/ordersType";
import { ProductType } from "@/features/products/types/product.type";
import {
  buildProductStats,
  getLowStockProducts,
  getTopSellingProducts,
} from "@/lib/analyticsHelpers";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardCardContainer } from "./CardContainer";
import { SelectModel } from "@/components/SelectModel";
import { ErrorState } from "@/components/ui/error-state";
import { WidgetLoadingSkeleton } from "./WidgetLoadingSkeleton";
import Image from "next/image";

export function DashboardWidgets() {
  const [widgetType, setWidgetType] = useState("topSellingProducts");

  const {
    data: orders,
    isLoading: orderIsLoading,
    error: orderError,
  } = useOrders();
  const {
    data: productsData,
    isLoading: productsIsLoading,
    error: ProductsError,
  } = useProducts({
    limit: 0,
  });

  const productsAnalytics = useMemo(
    () => buildProductStats({ carts: orders?.carts || [] }),
    [orders],
  );
  const topProducts = useMemo(
    () =>
      getTopSellingProducts({
        productsAnalytics,
        limit: 3,
      }),
    [productsAnalytics],
  );
  const LowStockProducts = useMemo(
    () => getLowStockProducts({ products: productsData?.products || [] }),
    [productsData],
  );
  const widgetData = useMemo(() => {
    return {
      title:
        widgetType === "topSellingProducts"
          ? "Top Selling Products"
          : "Low Stock Products",
      data:
        widgetType === "topSellingProducts" ? topProducts : LowStockProducts,
    };
  }, [topProducts, LowStockProducts, widgetType]);

  if (orderIsLoading || productsIsLoading) {
    return <WidgetLoadingSkeleton />;
  }

  if (orderError || ProductsError) {
    return (
      <ErrorState
        error={new Error("Failed to load Widgets data")}
        title="Widgets Data"
      />
    );
  }
  return (
    <DashboardCardContainer title={widgetData.title} className="relative">
      <SelectModel
        func={(val) => setWidgetType(val)}
        label="Select Widget"
        className="absolute right-1 top-2 md:top-7"
        items={[
          {
            text: "Top Selling Products",
            value: "topSellingProducts",
          },
          {
            text: "Low Stock Products",
            value: "lowStockProducts",
          },
        ]}
      />
      <div className="flex flex-col gap-6 rounded-sm">
        {widgetData.data.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="flex gap-4 justify-between items-center p-4 w-full">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={56}
                height={56}
              />
              <div className="flex flex-col flex-1 justify-center">
                <p className="leading-6 text-wrap">{product.title}</p>
                {widgetType == "topSellingProducts" && (
                  <span className="text-foreground">
                    {Math.round((product as ProductCartType).totalRevenue || 0)}{" "}
                    Sales
                  </span>
                )}
                {widgetType == "lowStockProducts" && (
                  <span className="text-warning">
                    {Math.round((product as ProductType).stock || 0)} Stock
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end">
                {widgetType == "topSellingProducts" && (
                  <p className="leading-6 text-success">${product.price}</p>
                )}
                {widgetType == "lowStockProducts" && <p>Low Stock</p>}
              </div>
            </div>
          </Link>
        ))}
        <Link
          href={"/inventory"}
          className="flex justify-center border border-border px-2.5 bg-primary text-primary-foreground rounded-lg "
        >
          Viw All Inventory
        </Link>
      </div>
    </DashboardCardContainer>
  );
}
