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
import { ProductType } from "@/features/products/types/product.type";
import { useCategoryList } from "@/hooks/useCategoryList";
import { useUpdateProductMutation } from "@/hooks/useUpdateProductMutation";
import { getCategoriesListData } from "@/lib/productsHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProductForm, productFormSchema } from "../schemas";
export function UpdateProductForm({
  product,
  onSuccess,
}: {
  product: ProductType;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      minimumOrderQuantity: product.minimumOrderQuantity,
      discountPercentage: product.discountPercentage,
    },
  });
  const { data: categoryList } = useCategoryList();
  const categories = getCategoriesListData(categoryList ?? []);
  const { mutate } = useUpdateProductMutation();

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    mutate(
      { id: product.id, product: { ...data } },
      { onSuccess: () => onSuccess() },
    );
  };

  return (
    <div className="p-8 w-full max-w-md">
      <form
        name="update product form"
        id="form-update-product"
        className="flex-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-6">
          <FieldSet>
            <FieldLegend className="flex gap-2 items-center">
              <SquarePen />
              Edit Product Information
            </FieldLegend>

            <FieldGroup className="gap-6 mt-6">
              <Field>
                <FieldLabel htmlFor="title">ProductName</FieldLabel>
                <Input {...register("title")} id="title" autoFocus />
                {errors.title && (
                  <p className="text-destructive" role="alert">
                    {errors.title.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Product Description
                </FieldLabel>
                <Textarea {...register("description")} id="description" />
                {errors.description && (
                  <p className="text-destructive" role="alert">
                    {errors.description.message}
                  </p>
                )}
              </Field>
              {product.brand && (
                <Field>
                  <FieldLabel htmlFor="brand">Product Brand</FieldLabel>
                  <Input {...register("brand")} id="brand" />
                  {errors.brand && (
                    <p className="text-destructive" role="alert">
                      {errors.brand.message}
                    </p>
                  )}
                </Field>
              )}
              <Field>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => {
                    return (
                      <SelectModel
                        label="Category"
                        items={categories}
                        activeValue={product.category}
                        func={field.onChange}
                      />
                    );
                  }}
                />
                {errors.category && (
                  <p className="text-destructive" role="alert">
                    {errors.category.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="discountPercentage">
                  Product Discount Percentage
                </FieldLabel>
                <Input
                  type="number"
                  step={"any"}
                  {...register("discountPercentage", { valueAsNumber: true })}
                  id="discountPercentage"
                />
                {errors.discountPercentage && (
                  <p className="text-destructive" role="alert">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Product Price</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  step={"any"}
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-destructive" role="alert">
                    {errors.price.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="stock">Product Stock</FieldLabel>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-destructive" role="alert">
                    {errors.stock.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="minimumOrderQuantity">
                  Product Minimum Order Quantity
                </FieldLabel>
                <Input
                  id="minimumOrderQuantity"
                  type="number"
                  {...register("minimumOrderQuantity", { valueAsNumber: true })}
                />
                {errors.minimumOrderQuantity && (
                  <p className="text-destructive" role="alert">
                    {errors.minimumOrderQuantity.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-update-product"
              disabled={isSubmitting}
            >
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
