"use client";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useOrders } from "@/hooks/useOrders";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { OrderTableType, OrderType } from "../types/ordersType";

export function OrderClient() {
  const { data, isLoading, error } = useOrders();

  const columns: OrderTableType[] = [
    {
      key: "id",
      label: "#ORD-Id",
      render: (order: OrderType) => (
        <Link href={`/orders/${order.id}`}>{` #ORd-${order.id}`}</Link>
      ),
    },
    {
      key: "userId",
      label: "User Id",
      render: (order: OrderType) => `Usr-${order.userId}`,
    },
    {
      key: "products",
      label: "Products",
      render: (order: OrderType) => order.products.length,
    },
    {
      key: "totalProducts",
      label: "TotalProducts",
      render: (order: OrderType) => order.totalProducts,
    },
    {
      key: "totalQuantity",
      label: "TotalQuantity",
      render: (order: OrderType) => order.totalQuantity,
    },
    {
      key: "total",
      label: "Total",
      render: (order: OrderType) => order.total,
    },
    {
      key: "discountedTotal",
      label: "DiscountedTotal",
      render: (order: OrderType) => order.discountedTotal,
    },
    {
      key: "savings",
      label: "Discount ",
      render: (order: OrderType) =>
        (order.total - order.discountedTotal).toFixed(2),
    },
  ];
  if (isLoading) return <LoadingSpinner />;
  // if (error) return toast.error("There Was an Error with getting Orders");
  return (
    <div className="w-full bg-secondary/40">
      {
        //  tabele Header
      }

      <div className="overflow-x-scroll no-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="text-center">
              {columns.map((h) => {
                const isSavings = h.key === "savings";
                return (
                  <th
                    key={h.key}
                    className={`px-2 py-6  min-w-25  uppercase ${isSavings && "text-accent"} `}
                  >
                    {h.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* tabele data */}
          <tbody className="">
            {data?.carts?.map((order: OrderType) => (
              <tr key={order.id} className="text-center">
                {columns.map((h) => {
                  const value = h.render(order);
                  const isId = h.key === "id";
                  const isUser = h.key === "userId";
                  const isSavings = h.key === "savings";
                  // If the value is an array (products), render its length
                  return (
                    <td
                      key={`${order.id}-${h.label}`}
                      className={cn("px-2 py-6", {
                        "text-accent": isId,
                        "text-muted-foreground": isUser,
                        "text-success": isSavings,
                      })}
                    >
                      {value}
                    </td>
                  );
                  // Otherwise, render the value directly
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* <div className="flex overflow-x-auto flex-col no-scrollbar">
        <div className="grid grid-cols-[repeat(8,minmax(128px,1fr))] text-center ">
          {columns.map((h) => {
            const isSavings = h.key === "savings";
            return (
              <p
                key={h.key}
                className={`px-2 py-6  wrap-break-word whitespace-normal uppercase ${isSavings && "text-accent"} `}
              >
                {h.label}
              </p>
            );
          })}
        </div>

        {
          //tabele data
        }
        <div className="flex flex-col">
          {data?.carts?.map((order: OrderType) => (
            <div
              key={order.id}
              className="grid grid-cols-[repeat(8,minmax(128px,1fr))] text-center"
            >
              {columns.map((h) => {
                const value = h.render(order);
                const isId = h.key === "id";
                const isUser = h.key === "userId";
                const isSavings = h.key === "savings";
                // If the value is an array (products), render its length
                return (
                  <p
                    key={`${order.id}-${h.label}`}
                    className={cn("px-2 py-6 whitespace-normal", {
                      "text-accent": isId,
                      "text-muted-foreground": isUser,
                      "text-success": isSavings,
                    })}
                  >
                    {value}
                  </p>
                );
                // Otherwise, render the value directly
              })}
            </div>
          ))}
        </div>
      </div> */
}
