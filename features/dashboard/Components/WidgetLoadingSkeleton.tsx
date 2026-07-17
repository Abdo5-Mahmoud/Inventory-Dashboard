import { SkeletonBase } from "@/components/ui/Skeleton-base";

export function WidgetLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full rounded-sm">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 justify-between items-center p-4 rounded-lg"
        >
          <SkeletonBase className="size-14" />

          <div className="flex flex-col flex-1 gap-2">
            <SkeletonBase className="w-1/3 h-4" />
            <SkeletonBase className="w-1/4 h-3" />
          </div>

          <SkeletonBase className="w-16 h-4" />
        </div>
      ))}
    </div>
  );
}
