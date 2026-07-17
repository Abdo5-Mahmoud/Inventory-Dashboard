import { ProductCartType } from "@/features/orders/types/ordersType";
import Image from "next/image";

export function OrderRow({ product }: { product: ProductCartType }) {
  return (
    <div
      className="w-full grid grid-cols-[minmax(200px,1fr)_repeat(4,minmax(120px,1fr))]  text-foreground uppercase border-b pl-4 items-center  text-center"
      key={`${product.id} + ${product.title}`}
    >
      <div className="flex gap-4 items-center">
        <Image
          fetchPriority="high"
          loading="eager"
          src={product.thumbnail}
          alt={product.title}
          width={48}
          height={48}
          className="rounded-sm"
        />
        <div className="flex flex-col">
          <p className="text-lg tracking-normal leading-6 text-muted-foreground">
            {product.title}
          </p>
          <p className="text-[12px] text-warning leading-4 tracking-widest">
            Disc: {product.discountPercentage}%
          </p>
        </div>
      </div>
      <p className="p-8 text-lg tracking-widest leading-4">{product.price}</p>
      <p className="p-8 text-lg tracking-widest leading-4">
        {product.quantity}
      </p>
      <p className="p-8 text-lg tracking-widest leading-4">{product.total}</p>
      <p className="p-8 text-lg tracking-widest leading-4">
        {product.discountedTotal.toFixed(2)}
      </p>
    </div>
  );
}
