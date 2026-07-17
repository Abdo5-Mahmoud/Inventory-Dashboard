import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center py-20 w-full h-full max-h-screen",
        className,
      )}
    >
      <Loader2 size={40} className="animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">Loading ...</p>
    </div>
  );
}
