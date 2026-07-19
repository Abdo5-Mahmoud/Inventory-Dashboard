import { SelectModel } from "@/components/SelectModel";
import { createQueryString } from "@/lib/url-helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function FilterCategoriesModel({
  active,
  categoryItems,
}: {
  active: string;
  categoryItems: {
    text: string;
    value: string;
  }[];
}) {
  const path = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const filterByCategory = useCallback(
    (category: string) => {
      category == "all"
        ? router.push(`${createQueryString({ category: "", params, path })}`)
        : router.push(`${createQueryString({ category, params, path })}`);
    },
    [params, path, router],
  );
  return (
    <SelectModel
      func={filterByCategory}
      items={categoryItems}
      label="Category Name"
      activeValue={active}
    />
  );
}
