import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center w-full h-screen",
        className,
      )}
    >
      <Loader2 className="w-10 h-10 animate-spin" />
      <p>Loading ...</p>
    </div>
  );
}
