"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorState title="Something went wrong" error={error} onRetry={reset} />
  );
}
