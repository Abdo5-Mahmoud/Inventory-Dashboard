import { MetaData } from "@/features/products/types/product.type";
import Image from "next/image";

export function ProductMetaData({ metadata }: { metadata: MetaData }) {
  return (
    <div className="flex justify-between items-center p-6 w-full rounded-lg border-t border-l bg-secondary text-foreground">
      <div className="flex flex-col flex-wrap gap-2">
        <h5 className="font-semibold tracking-[0.6px] leading-3">
          Tracking Metadata
        </h5>
        <p className="text-sm leading-5 tracking-[0.14px]">
          Created: {new Date(metadata.createdAt).toDateString()}
        </p>
        <p className="text-sm leading-5 tracking-[0.14px]">
          Updated: {new Date(metadata.updatedAt).toDateString()}
        </p>
      </div>
      <Image
        src={metadata.qrCode}
        alt={`${metadata.qrCode} barcode`}
        width={96}
        height={96}
        loading="lazy"
      />
    </div>
  );
}
