"use client";

import dynamic from "next/dynamic";
import { ChartSkeleton } from "./ChartSkeleton";
import { DashboardCardContainer } from "./CardContainer";

const SimpleChart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export function DashboardChart() {
  return (
    <DashboardCardContainer title="Analytics" className="relative">
      <SimpleChart />
    </DashboardCardContainer>
  );
}
