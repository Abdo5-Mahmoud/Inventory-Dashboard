"use client";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useSearchList } from "@/hooks/useSearchList";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Model from "../CompoundModal";
import LoadingSpinner from "./loading-spinner";

export function SearchComponent({ className }: { className?: string }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce({ value: inputValue, delay: 1000 });
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = (name: string, value: string) => {
    const current = new URLSearchParams(params.toString());
    if (value) {
      current.set(name, value);
    }
    return current.toString();
  };
  const { data: searchedData, isLoading: isLoadingProductsSearch } =
    useSearchList(debouncedValue);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    router.replace(
      `${pathname}?${createQueryString("search", debouncedValue)}`,
    );
  }
  return (
    <div className={className}>
      <Model
        onCloseAction={() => {
          router.replace(`${pathname}`);
        }}
      >
        <Model.Trigger type="div">
          <InputGroup className={cn(className)}>
            <InputGroupInput
              placeholder="Search analytics...."
              type="search"
              name="global-search"
              id="global-search"
              readOnly
            />
            <InputGroupAddon>
              <InputGroupButton>
                <Search className={`w-4 font-bold`} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Model.Trigger>

        <Model.Content className="z-50">
          <Model.Header>
            <InputGroup>
              <InputGroupInput
                placeholder="Search analytics...."
                onChange={handleInput}
                value={inputValue}
                type="search"
                autoFocus
              />
              <InputGroupAddon>
                <InputGroupButton size={"sm"}>
                  <Search className="font-bold" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Model.Header>
          <Model.Body>
            <div className="grid grid-cols-1 gap-4 justify-center items-center px-4 w-full h-full lg:grid-cols-2">
              {isLoadingProductsSearch && <LoadingSpinner />}
              {searchedData?.products?.length === 0 ? (
                <p>There is no prodcut with this name</p>
              ) : (
                searchedData?.products.map((product) => (
                  <Model.LinkButton
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="flex gap-2 items-center py-4 rounded-lg border min-h-40 bg-muted border-border"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="w-15"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{product.title}</h3>
                      <p>Sku : {product.sku}</p>
                    </div>
                    <p>Product QTY : {product.stock}</p>
                  </Model.LinkButton>
                ))
              )}
            </div>
          </Model.Body>
        </Model.Content>
      </Model>
    </div>
  );
}
