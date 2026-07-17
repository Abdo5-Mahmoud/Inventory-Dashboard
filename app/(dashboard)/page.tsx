import { DashboardMetricSkelton } from "@/components/DashboardMetricSkelton";
import { MatricCards } from "@/components/MatricCards";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button className="flex text-white bg-primary" disabled>
                  <ArrowDownToLine className="size-5" />
                  <span>Export Report</span>
                </Button>{" "}
              </span>
            </TooltipTrigger>
            <TooltipContent>Available with backend integration</TooltipContent>
          </Tooltip> */}
        </div>
      </SectionHeader>

      <Suspense fallback={<DashboardMetricSkelton />}>
        <MatricCards
          totalProducts={true}
          InventoryValue={true}
          orders={true}
          ordersValue={true}
        />
      </Suspense>
      <div className="flex flex-col gap-6 lg:flex-row">
        <DashboardChart />
        <DashboardWidgets />
      </div>
    </section>
  );
}
