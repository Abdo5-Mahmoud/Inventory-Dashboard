import { SelectModel } from "@/components/SelectModel";

export function FilterCategoriesModel({
  func,
  active,
  categoryItems,
}: {
  func: (val: string) => void;
  active: string;
  categoryItems: {
    text: string;
    value: string;
  }[];
}) {
  return (
    <SelectModel
      func={func}
      items={categoryItems}
      label="Category Name"
      activeValue={active}
    />
  );
}
