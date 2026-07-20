import { MatricCards } from "@/components/MatricCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OrderClient } from "@/features/orders/components/OrdersClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Orders",
  description: "Track customer orders and sales activity.",
};
export default function page() {
  return (
    <section className="flex flex-1 overflow-x-hidden flex-col gap-8 px-6 py-8">
      <SectionHeader>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl md:text-[32px] tracking-[-0,32] leading-10 font-semibold">
            Order Management{" "}
          </h2>
          <p className="leading-6 text-foreground">
            Monitor and manage customer fulfillment requests across all global
            nodes.
          </p>
        </div>
      </SectionHeader>
      <MatricCards
        orders={true}
        ordersValue={true}
        avgOrderValue={true}
        noOfProducts={true}
        className="lg:flex lg:flex-row"
      />

      <OrderClient />
    </section>
  );
}
