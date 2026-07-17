import { useCategoryList } from "@/hooks/useCategoryList";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useModel } from "@/components/CompoundModal";
import { SelectModel } from "@/components/SelectModel";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCategoriesListData } from "@/lib/productsHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { ProductForm, productFormSchema } from "../schemas";
export function CreateProductForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
  });
  const { close } = useModel();
  const { data: categoryList } = useCategoryList();
  const categories = getCategoriesListData(categoryList ?? []);
  const { mutate } = useCreateProduct();
  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  return (
    <div className="p-8 w-full max-w-md">
      <form
        name="create product form"
        id="form-create-product"
        className="flex-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-6">
          <FieldSet>
            <FieldLegend className="flex gap-2 items-center">
              <SquarePen />
              Create Product
            </FieldLegend>

            <FieldGroup className="gap-6 mt-6">
              <Field>
                <FieldLabel htmlFor="title">ProductName</FieldLabel>
                <Input
                  {...register("title")}
                  placeholder="Product Name"
                  id="title"
                />
                {errors.title && (
                  <p className="text-destructive">{errors.title.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Product Description
                </FieldLabel>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Product description"
                />
                {errors.description && (
                  <p className="text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="brand">Product Brand</FieldLabel>
                <Input {...register("brand")} placeholder="Brand" id="brand" />
                {errors.brand && (
                  <p className="text-destructive">{errors.brand.message}</p>
                )}
              </Field>
              <Field>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => {
                    return (
                      <SelectModel
                        label="Category"
                        items={categories}
                        func={field.onChange}
                      />
                    );
                  }}
                />
                {errors.category && (
                  <p className="text-destructive">{errors.category.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="discountPercentage">
                  Product Discount Percentage
                </FieldLabel>
                <Input
                  id="discountPercentage"
                  type="number"
                  placeholder="Discount Percentage"
                  step={"any"}
                  {...register("discountPercentage", { valueAsNumber: true })}
                />
                {errors.discountPercentage && (
                  <p className="text-destructive">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Product Price</FieldLabel>
                <Input
                  id="price"
                  placeholder="Price"
                  type="number"
                  step={"any"}
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-destructive">{errors.price.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="stock">Product Stock</FieldLabel>
                <Input
                  id="stock"
                  placeholder="Total Quantity"
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-destructive">{errors.stock.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="minimumOrderQuantity">
                  Product Minimum Order Quantity
                </FieldLabel>
                <Input
                  id="minimumOrderQuantity"
                  placeholder="Minmum Order"
                  type="number"
                  {...register("minimumOrderQuantity", { valueAsNumber: true })}
                />
                {errors.minimumOrderQuantity && (
                  <p className="text-destructive">
                    {errors.minimumOrderQuantity.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button variant="outline" type="button" onClick={close}>
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
