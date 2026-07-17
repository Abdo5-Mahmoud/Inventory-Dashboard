import { SelectModel } from "@/components/SelectModel";

import { sortingArray } from "../data";
export function SortModel({
  sortFunction,
  icon,
  activeValue,
}: {
  sortFunction: (val: string) => void;
  icon: React.ReactNode;
  activeValue?: string;
}) {
  return (
    <SelectModel
      label="Sort By"
      func={sortFunction}
      icon={icon}
      items={sortingArray}
      activeValue={activeValue}
    />
  );
}
