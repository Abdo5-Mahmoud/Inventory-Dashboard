import { SkeletonBase } from "@/components/ui/Skeleton-base";

export function ProductsLoadingSkeleton({ limit = 12 }: { limit: number }) {
  return (
    <>
      {[...Array(Number(limit))].map((_, i) => (
        <div
          className="flex flex-col gap-2 p-4 mx-auto w-full h-96 rounded-md border border-blue-300"
          key={i}
        >
          <SkeletonBase className="w-full h-64" />
          <SkeletonBase className="w-16 h-4" />
          <SkeletonBase className="w-32 h-4" />
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-center w-1/2">
              <SkeletonBase className="w-24 h-4" />
            </div>
            <SkeletonBase className="w-24 h-4" />
          </div>
        </div>
      ))}
    </>
  );
}
