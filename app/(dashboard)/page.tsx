import { DashboardMetricSkelton } from "@/components/DashboardMetricSkelton";
import { MatricCards } from "@/components/MatricCards";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DashboardChart } from "@/features/dashboard/Components/DashboardChart.client";
import { DashboardWidgets } from "@/features/dashboard/Components/DashboardWidgets";
import { ArrowDownToLine, Calendar } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="flex overflow-auto flex-col gap-8 px-6 pt-8 pb-8 w-full">
      <SectionHeader>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl md:text-[32px] tracking-[-0,32] leading-10 font-semibold">
            Overview Dashboard
          </h2>
          <p className="leading-6">Real-time enterprise performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex gap-3 text-muted-foreground bg-muted">
            <Calendar className="size-5" />
            <span>Last 30 days</span>
          </Button>
          <span className="inline-block relative group">
            <Button
              className="flex text-white cursor-not-allowed bg-primary"
              disabled
            >
              <ArrowDownToLine className="size-5" />
              <span>Export Report</span>
            </Button>

            <span
              className="
      pointer-events-none absolute left-1/2 top-full z-10 mt-3
      -translate-x-1/2 whitespace-nowrap rounded-md
      bg-gray-900 px-3 py-1.5 text-xs text-white
      opacity-0 transition-all duration-200
      group-hover:translate-y-0 group-hover:opacity-100
    "
            >
              Export feature is coming soon.
              <span className="absolute -top-1 left-1/2 w-2 h-2 bg-gray-900 rotate-45 -translate-x-1/2" />
            </span>
          </span>
        </div>
      </SectionHeader>

      <Suspense fallback={<DashboardMetricSkelton />}>
        <MatricCards
          totalProducts={true}
          InventoryValue={true}
          orders={true}
          ordersValue={true}
        />
        <div className="flex flex-col gap-6 lg:flex-row">
          <DashboardChart />
          <DashboardWidgets />
        </div>
      </Suspense>
    </section>
  );
}
