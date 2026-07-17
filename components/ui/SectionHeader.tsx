import { cn } from "@/lib/utils";

export function SectionHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-between items-center md:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
}
