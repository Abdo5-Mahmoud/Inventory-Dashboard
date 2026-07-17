import { OrderType } from "../types/ordersType";

function OrdersCard({ order }: { order: OrderType }) {
  return (
    <div className="flex flex-col flex-1 gap-3 p-4 bg-secondary/60">
      <div className="flex flex-1 justify-between items-center">
        {/* order id & customer name */}
        <div className="flex flex-col">
          <p className="leading-6 text-accent-foreground">
            #Order_Id:{order.id}
          </p>
          <p className="leading-7 text-gl text-muted-foreground">
            customer Name
          </p>
        </div>
        <p className="px-3 py-1 rounded-lg bg-success/10">
          {order.totalProducts}
        </p>
      </div>
      <div className="flex justify-between items-center pt-3">
        <p className="leading-4 tracking-[0.6px] text-[12px]">
          Total_Products: {order.totalQuantity}
        </p>

        <p className="text-xl tracking-normal leading-8 text-muted-foreground">
          ${order.total}
        </p>
      </div>
    </div>
  );
}
