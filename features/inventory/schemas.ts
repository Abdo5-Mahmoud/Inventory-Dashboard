import * as z from "zod";
import { ProductType } from "@/features/products/types/product.type";

export const productFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  category: z.string().min(1, "Category is required"),

  brand: z.string().min(1, "Brand is required").optional(),

  price: z
    .number({
      error: "Price is required",
    })
    .positive("Price must be greater than 0"),

  stock: z
    .number({
      error: "Stock is required",
    })
    .min(0, "Stock cannot be negative"),

  minimumOrderQuantity: z
    .number({
      error: "Minimum order quantity is required",
    })
    .min(1, "Minimum order quantity must be at least 1"),

  discountPercentage: z
    .number({
      error: "Discount percentage is required",
    })
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot exceed 100%"),
});

export type ProductForm = z.infer<typeof productFormSchema>;
