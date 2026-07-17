import { ReactNode } from "react";

export function EmptyState({
  msg,
  children,
}: {
  msg: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <p className="text-muted-foreground">{msg}</p>
      {children}
    </div>
  );
}
