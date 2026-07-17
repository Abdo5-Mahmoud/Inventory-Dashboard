import React from "react";

export function ListItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`flex gap-4 items-center px-4 py-2 rounded-sm border hover:bg-muted border-border ${className}`}
    >
      {children}
    </li>
  );
}
