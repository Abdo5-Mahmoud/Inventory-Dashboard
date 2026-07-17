"use client";
import { SelectModel } from "@/components/SelectModel";
import { ErrorState } from "@/components/ui/error-state";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import {
  buildProductStats,
  getTopSellingCategories,
  getTopSellingProducts,
} from "@/lib/analyticsHelpers";
import { RechartsDevtools } from "@recharts/devtools";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartSkeleton } from "./ChartSkeleton";
const SimpleBarChart = () => {
  const {
    data: orders,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useOrders();
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts({
    limit: 0,
  });
  const [limit, setLimit] = useState(3);
  const [sortType, setSortType] = useState("top-products");

  const productsAnalytics = useMemo(
    () => buildProductStats({ carts: orders?.carts ?? [] }),
    [orders],
  );

  const topProducts = useMemo(
    () =>
      getTopSellingProducts({
        productsAnalytics,
        limit,
      }),
    [productsAnalytics, limit],
  );

  const topCategories = useMemo(
    () =>
      getTopSellingCategories({
        products: productsData?.products ?? [],
        productsAnalytics,
        limit,
      }),
    [productsAnalytics, productsData, limit],
  );

  const chartData = useMemo(() => {
    return sortType == "top-products" ? topProducts : topCategories;
  }, [sortType, topProducts, topCategories]);
  if (isLoadingOrders || isLoadingProducts) {
    return <ChartSkeleton />;
  }

  if (ordersError || productsError) {
    const error = ordersError || productsError;
    return (
      <ErrorState
        error={new Error("Failed to load dashboard data")}
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  return (
    <>
      <div className="flex absolute top-4 right-4 gap-1">
        <SelectModel
          func={(val) => setSortType(val)}
          label="View By"
          items={[
            {
              text: "Top products",
              value: "top-products",
            },
            {
              text: "Top categories",
              value: "top-categories",
            },
          ]}
        />
        <SelectModel
          func={(val) => setLimit(Number(val))}
          label="Select Limit"
          items={[
            {
              text: "3",
              value: "3",
            },
            {
              text: "5",
              value: "5",
            },
          ]}
        />
      </div>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
          outline: "none",
          border: "none",
        }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="title"
          angle={30}
          height={70}
          textAnchor="start"
          tick={{ fontSize: 12 }}
          tickMargin={12}
        />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalRevenue" fill="#82ca9d" radius={[10, 10, 0, 0]} />
        <RechartsDevtools />
      </BarChart>
    </>
  );
};

export default SimpleBarChart;
