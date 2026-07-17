export const DashboardCardContainer = ({
  children,
  className,
  title,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={`w-full rounded-lg bg-card/70 border border-border flex flex-col justify-center items-center p-8 shadow-xs text-muted-foreground ${className}`}
    >
      <div className="flex items-center justify-between w-full">
        <p className="pb-8 text-2xl leading-8 font-semibold">{title}</p>
        {icon}
      </div>
      {children}
    </div>
  );
};
