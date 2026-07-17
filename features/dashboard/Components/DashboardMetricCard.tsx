import { DashboardMetricCardProps } from "../types/dashboardTypes";
const variants: Record<
  DashboardMetricCardProps["colorVariant"],
  {
    text: string;
    bg: string;
  }
> = {
  success: {
    text: "text-success",
    bg: "bg-success/10",
  },
  accent: {
    text: "text-accent",
    bg: "bg-accent/10",
  },
  warning: {
    text: "text-warning",
    bg: "bg-warning/10",
  },
  destructive: {
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
};

export function DashboardMetricCard({
  title,
  value,
  percentage,
  icon1: Icon1,
  icon2: Icon2,
  colorVariant,
  pageName,
}: DashboardMetricCardProps) {
  const variant = variants[colorVariant];
  return (
    <div
      className={`flex flex-1 flex-col lg:flex-row  lg:items-center gap-1 justify-between rounded-lg md:p-4  flex-wrap xlg:p-8 bg-card ${pageName === "products" ? "p-4" : "p-8"}`}
    >
      <div
        className={`flex flex-1 justify-between lg:justify-center lg:items-center lg:flex-col lg:gap-1 ${variant.text}`}
      >
        {Icon1 && <Icon1 className={`p-2 rounded-sm size-9 ${variant.bg}`} />}

        <span className="flex gap-1 items-center leading-6">
          {Icon2 ? <Icon2 className="size-3.5" /> : ""}
          {percentage}
        </span>
      </div>

      <div className="flex flex-1 gap-1 justify-between items-center lg:justify-center lg:items-center lg:flex-col lg:gap-1">
        <p className="pt-3 uppercase tracking-[0.8px] leadding-6">{title}</p>

        <p
          className={`text-xl lg:text-2xl font-semibold leading-8 ${variant.text}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
