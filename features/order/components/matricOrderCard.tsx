export function MetricOrderCard({
  title,
  value,
  color = "muted-foreground",
}: {
  title: string;
  value: number | string;
  color?: "success" | "warning" | "destructive" | "muted-foreground";
}) {
  return (
    <div className="flex flex-col justify-between  p-4 bg-muted/40 w-full border rounded-lg">
      {" "}
      <p className="capitalize text-sm leading-4 tracking-wider text-muted-foreground">
        {title}
      </p>
      <p
        className={`text-2xl font-bold leading-8 tracking-normal text-${color}`}
      >
        {value}
      </p>
    </div>
  );
}
