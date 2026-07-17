export function SkeletonBase({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`rounded animate-pulse bg-muted ${className}`}>
      {children}
    </div>
  );
}
