import { SkeletonBase } from "@/components/ui/Skeleton-base";

export function ChartSkeleton() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-lg">
        <div className="flex gap-2 justify-between items-center mb-6">
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 items-center">
                <SkeletonBase className="w-8 h-5" />
              </div>
            ))}
          </div>
          <SkeletonBase className="w-full h-40" />
          <SkeletonBase className="w-full h-40" />
          <SkeletonBase className="w-full h-40" />
        </div>
        <div className="flex gap-4 justify-center mt-8">
          {[...Array(3)].map((_, i) => (
            <SkeletonBase key={i} className="w-24 h-10" />
          ))}
        </div>
      </div>
    </div>
  );
}
