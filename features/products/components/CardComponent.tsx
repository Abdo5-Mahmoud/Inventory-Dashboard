import { Button } from "@/components/ui/button";
import {
  ProductType,
  StockStatusType,
} from "@/features/products/types/product.type";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export function CardComponent({
  product,
  index,
}: {
  product: ProductType;
  index: number;
}) {
  const stockStatus: StockStatusType = useMemo(() => {
    if (product.stock > 10)
      return {
        status: "IN stock",
        bg: "bg-success/20 ",
        border: "border-border",
        stockType: "inStock",
      };
    else if (product.stock > 1)
      return {
        status: "low Stock",
        bg: "bg-destructive/20",
        border: "border-destructive",
        stockType: "lowStock",
      };
    else
      return {
        status: "Out of Stock",
        bg: "bg-destructive/20",
        border: "border-border",
        stockType: "outOfStock",
      };
  }, [product]);
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden flex-col rounded-xl justify-between bg-muted text-muted-foreground items-center border md:w-full relative ",
        stockStatus.border,
      )}
    >
      <div className="flex items-center px-4 w-full md:gap-0 md:p-0 md:flex-col">
        <Image
          loading="lazy"
          {...(index > 3 && {
            fetchPriority: "high",
          })}
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          sizes="(max-width: 768px) 100px, 200px"
          className={cn("", "rounded-lg", "w-48 h-48", "object-cover")}
        />
        <div className="flex flex-col justify-between px-4  w-full lg:pt-6 md:mt-1 md:gap-1">
          <div className={cn("flex", "justify-between", "items-center")}>
            <h4
              className={cn(
                "text-lg leading-5.5 md:leading-7",
                "w-3/4",
                "font-normal md:font-bold truncate ",
              )}
            >
              {product.title}
            </h4>
            <span
              className={cn(
                stockStatus.bg,
                "uppercase",
                "rounded-5xl",
                "py-0.5 px-3",
                "text-[10px] text-center",
                "leading-4",
                "absolute top-2 right-2",
              )}
            >
              {stockStatus.status}
            </span>
          </div>
          <p
            className={cn(
              "pt-1",
              "leading-4 tracking-[0.6px] text-[12px]",
              "text-foreground",
            )}
          >
            SKU:{product.sku}
          </p>
          <div className="flex justify-between pt-2 md:pb-3">
            <p className="text-xl leading-7.5 font-normal md:text-2xl md:font-bold ">
              ${Math.round(product.price)}
            </p>
            <p className="flex leading-6 text-foreground md:flex-col">
              <span className="block md:hidden">Qty:</span>
              <span className="hidden text-xs leading-4 tracking-[0.6px] md:block">
                Quantity:
              </span>
              <span className="md:text-success md:flex">
                {product.stock} <span className="hidden md:block">units</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button variant="secondary" className="w-full" asChild>
          <Link href={`/inventory/${product.id}`}>
            <Pencil aria-hidden={true} />
            Show Product
          </Link>
        </Button>
      </div>
    </div>
  );
}
