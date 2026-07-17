export function FormInput({
  label,
  type,
  name,
  id,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm leading-5 tracking-[0.7px] font-medium text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        autoComplete="true"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-sm border bg-popover border-border text-muted-foreground"
      />
    </div>
  );
}
