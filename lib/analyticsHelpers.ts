import { OrderType } from "@/features/orders/types/ordersType";
import { ProductType } from "@/features/products/types/product.type";
type ProductsAnalyticsType = {
  discountPercentage: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  totalRevenue: number;
};

export function buildProductStats({
  carts,
}: {
  carts?: OrderType[];
}): Map<number, ProductsAnalyticsType> {
  if (!carts) return new Map();
  const stats = new Map<number, ProductsAnalyticsType>();
  const products = carts.flatMap((cart) => cart.products);

  products.forEach((product) => {
    const existing = stats.get(product.id);
    if (!existing) {
      stats.set(product.id, {
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        quantity: product.quantity,
        thumbnail: product.thumbnail,
        totalRevenue: product.total,
      });
    } else {
      stats.get(product.id)!.quantity += product.quantity;
      stats.get(product.id)!.totalRevenue += product.total;
    }
  });
  // console.log("productsAnalytics", stats);
  return stats;
}

export function getTopSellingProducts({
  productsAnalytics,
  limit = 3,
}: {
  productsAnalytics?: Map<number, ProductsAnalyticsType>;
  limit?: number;
}) {
  if (!productsAnalytics) return [];

  const topProducts = Array.from(productsAnalytics.values())
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);

  return topProducts;
}

export function getTopSellingCategories({
  products,
  productsAnalytics,
  limit = 3,
}: {
  products?: ProductType[];
  productsAnalytics?: Map<number, ProductsAnalyticsType>;
  limit?: number;
}) {
  // console.log(productsAnalytics);
  if (!products || !productsAnalytics) return [];
  const topCategories = new Map();
  products.forEach((p) => {
    const existing = topCategories.get(p.category);
    if (existing) {
      existing.totalRevenue += productsAnalytics.get(p.id)?.totalRevenue || 0;
    } else {
      topCategories.set(p.category, {
        title: p.category,
        totalRevenue: productsAnalytics.get(p.id)?.totalRevenue || 0,
      });
    }
  });
  // console.log(topCategories.values());

  return Array.from(topCategories.values())
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

export function getLowStockProducts({
  products,
  limit,
}: {
  products: ProductType[];
  limit?: number;
}) {
  const lowStockProducts =
    products?.filter((p) => p.stock < 10).slice(0, limit) || [];
  return lowStockProducts;
}
