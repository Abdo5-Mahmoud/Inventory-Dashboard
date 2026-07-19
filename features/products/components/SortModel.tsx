import { SelectModel } from "@/components/SelectModel";

import { sortingArray } from "../data";
import { useCallback } from "react";
import { createQueryString } from "@/lib/url-helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function SortModel({
  icon,
  activeValue,
}: {
  icon: React.ReactNode;
  activeValue?: string;
}) {
  const path = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const sortProducts = useCallback(
    (sortBy: string) => {
      router.push(`${createQueryString({ params, path, sortBy })}`);
    },
    [params, path, router],
  );
  return (
    <SelectModel
      label="Sort By"
      func={sortProducts}
      icon={icon}
      items={sortingArray}
      activeValue={activeValue}
    />
  );
}
