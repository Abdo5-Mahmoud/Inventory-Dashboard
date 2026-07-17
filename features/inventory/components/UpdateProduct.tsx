"use client";

import Model, { useModel } from "@/components/CompoundModal";
import { ProductType } from "@/features/products/types/product.type";
import { UpdateProductForm } from "./UpdateProductForm";

export function EditProduct({ product }: { product: ProductType }) {
  const { close } = useModel();
  return (
    <div className="flex-1">
      <Model className="overflow-hidden min-h-0">
        <Model.Trigger variant="outline" className="w-full">
          <p>Edit Product</p>
        </Model.Trigger>
        <Model.Content contentHeight="h-[80%]">
          <Model.Body className="">
            <UpdateProductForm product={product} onSuccess={close} />
          </Model.Body>
        </Model.Content>
      </Model>
    </div>
  );
}
