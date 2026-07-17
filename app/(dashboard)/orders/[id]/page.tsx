import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricOrderCard } from "@/features/order/components/matricOrderCard";
import { OrderCard } from "@/features/order/components/OrderCard";
import { OrderRow } from "@/features/order/components/OrderRow";
import { getCartById } from "@/features/orders/services/orders.service";
import { ProductCartType } from "@/features/orders/types/ordersType";
import { getUserByid } from "@/features/user/userServices";
import { Phone, Truck, Wallet } from "lucide-react";
import Image from "next/image";

export default async function Orders({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCartById({ id: Number(id) });
  const userData = await getUserByid({ id: data.userId });

  const randomDate = new Date(
    Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
  );
  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <SectionHeader className="items-start md:flex-col">
        <h2 className="text-[32px] tracking-[-0,32] leading-10 font-semibold  w-full text-muted-foreground">
          Order #{id}
        </h2>
        <p>placed on {randomDate.toDateString()}</p>
        <div className="flex flex-col grid-cols-2 gap-4 w-full md:grid lg:grid-cols-5">
          <MetricOrderCard title="Total products" value={data.totalProducts} />
          <MetricOrderCard title="Total quantity" value={data.totalQuantity} />
          <MetricOrderCard title="Total price" value={data.total} />
          <MetricOrderCard
            title="Discount total"
            value={data.discountedTotal}
            color="success"
          />
          <MetricOrderCard
            title="Total savings"
            value={(data.total - data.discountedTotal).toFixed(2)}
            color="warning"
          />
        </div>
      </SectionHeader>

      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-[1fr] gap-6 lg:grid-cols-[5fr_1fr]">
          <div className="flex overflow-hidden flex-col flex-1 rounded-sm border bg-card/40">
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold tracking-normal leading-7 text-muted-foreground">
                  Order Items
                </h3>
                <p className="text-foreground leading-4 tracking-[0.6px]">
                  {data.totalProducts} Items
                </p>
              </div>
              <div className="overflow-x-scroll no-scrollbar">
                {/* table header */}
                <div className="min-w-fit">
                  <div className="grid grid-cols-[minmax(200px,1fr)_repeat(4,minmax(120px,1fr))]  text-foreground uppercase items-center ">
                    <p className="px-4 py-2 text-[12px] leading-4 tracking-widest ">
                      Product
                    </p>
                    <p className="px-4 py-2 text-[12px] leading-4 tracking-widest text-end">
                      Price
                    </p>
                    <p className="px-4 py-2 text-[12px] leading-4 tracking-widest">
                      Quantity
                    </p>
                    <p className="px-4 py-2 text-[12px] leading-4 tracking-widest">
                      Total
                    </p>
                    <p className="px-4 py-2 text-[12px] leading-4 tracking-widest">
                      Dis.Total
                    </p>
                  </div>
                  {/* table body */}
                  {data.products.map((prod: ProductCartType) => {
                    return <OrderRow product={prod} key={prod.id} />;
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 min-w-fit">
              <div className="flex flex-col gap-2 w-full md:w-1/2 bg-input-background/30">
                <p className="flex justify-between tracking-[0.14px] text-sm leading-5">
                  <span>Subtotal</span>
                  <span>${data.total.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-warning tracking-[0.14px] text-sm leading-5">
                  <span>Total Discount</span>
                  <span>
                    -${(data.total - data.discountedTotal).toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between tracking-[0.14px] text-sm leading-5">
                  <span>Shipping</span>
                  <span className="font-semibold uppercase text-success">
                    free
                  </span>
                </p>
                <p className="flex justify-between text-lg tracking-normal leading-7 border-t text-muted-foreground">
                  <span>Total Amount</span>
                  <span>${data.discountedTotal.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
          {/* customer info */}
          <div className="flex flex-col gap-6">
            <OrderCard>
              <p className="text-lg tracking-normal text-muted-foreground">
                Customer Info
              </p>
              <div className="flex gap-4">
                <Image
                  src={userData.image}
                  width={48}
                  height={48}
                  alt={userData.firstName}
                  className="object-cover rounded-sm"
                />
                <div className="text-muted-foreground">
                  <p className="text-lg tracking-normal leading-6">
                    User ID: {data.userId}
                  </p>
                  <p className="text-foreground text-[12px] leading-4 tracking-widest">
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <p className="flex gap-2 items-center">
                  <Phone size={14} /> {userData.phone}
                </p>
              </div>
            </OrderCard>
            <OrderCard>
              <p className="flex justify-between">
                <span className="font-semibold tracking-normal leading-4 text-muted-foreground">
                  Shipping Details
                </span>
                <Truck size={20} className="text-foreground" />
              </p>
              <p className="text-sm leading-4 uppercase text-foreground">
                Shipping address
              </p>
              <p className="">
                {userData.address.address},{userData.address.city},
                <br />
                {userData.address.state},{userData.address.postalCode},
                <br />
                {userData.address.country},
              </p>
              <div className="grid grid-cols-2">
                <p className="font-semibold tracking-normal leading-4 text-muted-foreground">
                  Payment Method:
                </p>
                <p className="text-sm leading-4 text-muted-foreground">
                  {userData.bank.cardType} Card
                </p>
              </div>
            </OrderCard>
            <OrderCard>
              <p className="flex justify-between">
                <span className="font-semibold tracking-normal leading-4 text-muted-foreground">
                  Payment Status
                </span>
                <Wallet size={20} className="text-foreground" />
              </p>
              <div>
                <p className="uppercase">Payment Method</p>
                <p className="flex gap-2 items-center">
                  <span className="uppercase py-0.5 px-1 border border-border/30 bg-white/5 text-[10px] leading-4 rounded">
                    Visa
                  </span>
                  Ending in **** {userData.bank.cardNumber.slice(-4)}
                </p>
              </div>
            </OrderCard>
          </div>
        </div>
      </div>
    </div>
  );
}
