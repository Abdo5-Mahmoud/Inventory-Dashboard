import { SkeletonBase } from "./ui/Skeleton-base";

export function DashboardMetricSkelton() {
  return (
    <div
      className={`flex flex-col flex-wrap flex-1 gap-1 justify-between rounded-lg lg:flex-row lg:items-center md:p-4 xlg:p-8 bg-card`}
    >
      <div
        className={`flex flex-1 justify-between lg:justify-center lg:items-center lg:flex-col lg:gap-1`}
      >
        <SkeletonBase className={`p-2 rounded-sm size-9`} />

        <span className="flex gap-1 items-center leading-6">
          <SkeletonBase className="size-3.5" />
          <SkeletonBase className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-1 gap-1 justify-between items-center lg:justify-center lg:items-center lg:flex-col lg:gap-1">
        <SkeletonBase className="uppercase tracking-[0.8px] leadding-6" />

        <SkeletonBase
          className={`text-xl font-semibold leading-8 lg:text-2xl`}
        />
      </div>
    </div>
  );
}
