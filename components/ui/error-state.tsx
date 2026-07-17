import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

type ErrorStateProps = {
  title?: string;
  error?: Error;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Failed to load data",
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-62 flex-col items-center justify-center rounded-xl border border-dashed bgcard p-6 text-center">
      {" "}
      <div className="mb-2 rounded-full bg-destructive/10 p-3">
        {" "}
        <AlertTriangle className="size-6 text-destructive" />{" "}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {error?.message ?? "Something went wrong while loading this data."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}
