export function SettingsCardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-8 p-8 rounded-lg bg-input-background">
      {children}
    </div>
  );
}
