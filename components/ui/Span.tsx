import React from "react";
const textColors: Record<string, string> = {
  destructive: "text-destructive",
  success: "text-success",
  muted: "text-muted-foreground",
};

export function Span({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={`${textColors[color || "muted-foreground"]} text-sm leading-5 tracking-[0.14px] ${className}`}
    >
      {children}
    </span>
  );
}
