import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectModel({
  func,
  items,
  label,
  icon,
  className,
  activeValue,
}: {
  func: (val: string) => void;
  label: string;
  items: { text: string; value: string }[];
  icon?: React.ReactNode;
  className?: string;
  activeValue?: string;
}) {
  return (
    <Select onValueChange={func} defaultValue={activeValue}>
      {" "}
      <div
        className={`flex gap-1 items-center px-2 py-1 rounded-lg border gap bg-input-background border-border ${className}`}
      >
        <SelectTrigger className="p-0 border-none focus:ring-0">
          <SelectValue placeholder={items[0].text} />
        </SelectTrigger>
        {icon}
      </div>
      <SelectContent className="text-foreground">
        <SelectGroup className="">
          <SelectLabel>{label}</SelectLabel>

          {items.map((item) => {
            return (
              <SelectItem
                className="hover:bg-primary/10 focus:bg-primary/10"
                value={item.value || ""}
                key={item.value}
              >
                {item.text}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
