import { ReactNode } from "react";

export function OrderCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-sm bg-card/40">
      {children}
    </div>
  );
}
