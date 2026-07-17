import { OrderType } from "@/features/orders/types/ordersType";
import {
  CategoryType,
  ProductType,
} from "@/features/products/types/product.type";

export function getProductRevenue(product: ProductType) {
  const maxStock = 100;
  const productRevenue = Math.round((product.stock / maxStock) * product.price);
  return { name: product.title, sales_value: productRevenue };
}

export function getAllProductsRevenue(products: ProductType[]) {
  const data = products ? products.sort((a, b) => b.stock - a.stock) : [];
  return data.map((product) => getProductRevenue(product));
}

export function getTotalInventoryValue(products: ProductType[]) {
  return Math.round(
    products.reduce((acc, curr) => acc + curr.stock * curr.price, 0),
  );
}
export function getOrdersValue(orders: OrderType[]) {
  return Math.round(orders.reduce((acc, curr) => acc + curr.total, 0));
}

export function getCategoriesListData(categories: CategoryType[]) {
  const data =
    categories?.map((category) => ({
      text: category.name,
      value: category.slug,
    })) ?? [];

  return [
    {
      text: "All",
      value: "all",
    },
    ...data,
  ];
}
