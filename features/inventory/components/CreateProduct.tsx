"use client";

import Model from "@/components/CompoundModal";
import { Button } from "@/components/ui/button";
import { CreateProductForm } from "./CreateProductForm";

export function CreateProduct() {
  return (
    <div className="flex-1 w-full">
      <Model className="overflow-hidden min-h-0">
        <Model.Trigger variant="outline" className="w-full">
          <p>+ Create Product</p>{" "}
        </Model.Trigger>
        <Model.Content contentHeight="h-[80%]">
          <Model.Body className="">
            <CreateProductForm />
          </Model.Body>
        </Model.Content>
      </Model>
    </div>
  );
}
