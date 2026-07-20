import { DeleteTheProduct } from "@/components/DeleteProduct";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DashboardMetricCard } from "@/features/dashboard/Components/DashboardMetricCard";
import { ActiveImgComponent } from "@/features/inventory/components/ActiveImgComponent";
import { ProductMetaData } from "@/features/inventory/components/MetaData";
import { ProductTabs } from "@/features/inventory/components/ProductTabs";
import { EditProduct } from "@/features/inventory/components/UpdateProduct";
import { getProductById } from "@/features/inventory/services/product.service";
import { Archive, Banknote, Star } from "lucide-react";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById({ id });

  return {
    title: product.title,
    description: product.description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;
  const product = await getProductById({ id: productId });

  return (
    <section className="flex overflow-x-hidden flex-col gap-6 px-4 pt-6 pb-8 w-[90%] mx-auto no-scrollbar ">
      <div className="flex flex-col justify-evenly">
        <SectionHeader>
          {/* tags */}

          <h2 className="text-3xl font-bold leading-12.5 tracking-normal text-muted-foreground ">
            <span className="pr-2 text-2xl text-foreground">
              Product Title:
            </span>
            {product.title}
          </h2>

          <div className="flex gap-x-3.5 gap-y-2 flex-wrap">
            <EditProduct product={product} />
            <DeleteTheProduct id={product.id} title={product.title} />
          </div>
        </SectionHeader>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 items-center">
          <ActiveImgComponent
            title={product.title}
            images={product.images}
            thumbnail={product.thumbnail}
          />
          {/* metaData part */}
          <ProductMetaData metadata={product.meta} />{" "}
        </div>

        <div className="flex flex-col gap-6">
          {/* Title and Sku */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-4 justify-between">
              <p className="tracking-normal leading-6 text-accent">
                {product.brand}
              </p>
              <p className="text-end">{product.tags.join(" / ")}</p>
            </div>
            <p className="text-3xl tracking-[-0.32px] font-semibold leading-10">
              {product.title}
            </p>
            <p className="font-normal tracking-normal leading-6 text-muted-foreground">
              <span className="text-foreground">SKU: </span>
              {product.sku}
            </p>
          </div>

          {/* Stock and price part */}
          <div className="flex flex-col gap-4 md:flex-row">
            <DashboardMetricCard
              title="GLOBAL PRICING"
              icon1={Banknote}
              value={`$${product.price}`}
              percentage={`-${product.discountPercentage}% institutional`}
              colorVariant="success"
            />{" "}
            <DashboardMetricCard
              title="INVENTORY HEALTH"
              icon1={Archive}
              value={`${product.stock} units`}
              percentage={`${product.rating}`}
              icon2={Star}
              colorVariant="accent"
            />{" "}
          </div>

          <div className="pt-4">
            <div className="flex flex-col pt-4">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
