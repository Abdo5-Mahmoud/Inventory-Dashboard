"use client";
import { DashboardMetricCard } from "@/features/dashboard/Components/DashboardMetricCard";
import { useCategoryList } from "@/hooks/useCategoryList";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { getOrdersValue, getTotalInventoryValue } from "@/lib/productsHelpers";
import {
  Box,
  MoveUpRight,
  SquareActivity,
  SquareKanban,
  SquareMousePointer,
  UserRoundSearch,
  Van,
} from "lucide-react";

export function MatricCards({
  totalProducts,
  InventoryValue,
  orders,
  ordersValue,
  showCategories,
  className,
  avgOrderValue,
  noOfProducts,
}: {
  totalProducts?: boolean;
  InventoryValue?: boolean;
  orders?: boolean;
  ordersValue?: boolean;
  showCategories?: boolean;
  className?: string;
  avgOrderValue?: boolean;
  noOfProducts?: boolean;
}) {
  const { data: ordersData } = useOrders();
  const { data: productsData } = useProducts({
    limit: 0,
  });
  const { data: categoriesList } = useCategoryList();
  const totalOrdersValue = getOrdersValue(ordersData?.carts ?? []);
  const totalInventoryValue = getTotalInventoryValue(
    productsData?.products ?? [],
  );

  return (
    <div
      className={`flex flex-col flex-1 gap-8 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6 ${className}`}
    >
      {totalProducts && (
        <DashboardMetricCard
          title="Total Products"
          icon1={SquareKanban}
          value={`${productsData?.total || 0}`}
          percentage="+12.%"
          colorVariant="success"
          icon2={MoveUpRight}
        />
      )}
      {InventoryValue && (
        <DashboardMetricCard
          icon1={SquareMousePointer}
          icon2={MoveUpRight}
          percentage="8.2%"
          title="Total Inventury Value"
          value={`$${Math.round(totalInventoryValue)}`}
          colorVariant="success"
        />
      )}
      {orders && (
        <DashboardMetricCard
          icon1={Van}
          icon2={MoveUpRight}
          percentage="8.2%"
          title="Orders"
          value={`${ordersData?.total || 0}`}
          colorVariant="accent"
        />
      )}
      {ordersValue && (
        <DashboardMetricCard
          icon1={UserRoundSearch}
          icon2={MoveUpRight}
          title="Total Orders Value"
          value={`$${Math.round(totalOrdersValue)}`}
          colorVariant="accent"
        />
      )}
      {showCategories && (
        <DashboardMetricCard
          title="Total Categories"
          icon1={SquareActivity}
          value={`${categoriesList?.length}`}
          colorVariant="accent"
          icon2={MoveUpRight}
        />
      )}
      {avgOrderValue && (
        <DashboardMetricCard
          icon1={SquareActivity}
          icon2={MoveUpRight}
          percentage="8.2%"
          title="Avg Order Value"
          value={`$${(totalOrdersValue / (ordersData?.total || 1)).toFixed(2)}`}
          colorVariant="accent"
        />
      )}
      {noOfProducts && (
        <DashboardMetricCard
          icon1={Box}
          icon2={MoveUpRight}
          title="No of Products"
          value={`${productsData?.total}`}
          colorVariant="accent"
        />
      )}
    </div>
  );
}
