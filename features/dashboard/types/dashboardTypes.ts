import { LucideIcon } from "lucide-react";

export type DashboardMetricCardProps = {
  title: string;
  value: string;
  percentage?: string;
  icon1?: LucideIcon;
  icon2?: LucideIcon;
  colorVariant: "success" | "accent" | "warning" | "destructive";
  className?: string;
  pageName?: string;
};
