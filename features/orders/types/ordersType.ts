import { ProductType } from "@/features/products/types/product.type";

export interface OrderType {
  id: string;
  products: ProductCartType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
export interface ProductCartType extends ProductType {
  quantity: number;
  total: number;
  totalRevenue?: number;
  discountedTotal: number;
}

export type OrderDataType = {
  carts: OrderType[];
  total: number;
  skip: number;
  limit: number;
};

export type OrderTableType = {
  key: string;
  label: string;
  render: (order: OrderType) => React.ReactNode;
};
