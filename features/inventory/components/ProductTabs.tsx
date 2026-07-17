import { ProductCardComponent } from "@/components/ProductCardComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/features/products/types/product.type";
import { PanelLeft, ShieldCheck, Star, Truck } from "lucide-react";

export function ProductTabs({ product }: { product: ProductType }) {
  return (
    <Tabs defaultValue="description" className="overflow-hidden gap-4">
      <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
        <TabsList variant="line" className="gap-0">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping-policies">Shipping&Policies</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews({product.reviews?.length || 0})
          </TabsTrigger>
        </TabsList>
      </div>
      {/* description */}
      <TabsContent value="description" className="overflow-hidden">
        <ProductCardComponent
          title="Description"
          content={<p className="w-full">{product.description}</p>}
        />
      </TabsContent>
      {/* specifications */}
      <TabsContent
        value="specifications"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* weight */}
        <ProductCardComponent
          className="mx-auto w-64"
          description={
            <div className="flex flex-wrap justify-between items-center">
              <p className="italic tracking-tighter capitalize">Net Weight:</p>
              <p className="font-bold">{product.weight}(With Strap)</p>
            </div>
          }
        />
        {/* Dimensions */}
        <ProductCardComponent
          className="mx-auto w-64"
          description={
            <div className="flex flex-wrap justify-between items-center">
              <p className="italic tracking-tighter capitalize">Dimensions:</p>
              <p className="font-bold">
                {product.dimensions.width}mm x {product.dimensions.height}mm x{" "}
                {product.dimensions.depth}mm
              </p>
            </div>
          }
        />

        <ProductCardComponent
          className="mx-auto w-64"
          description={
            <div className="flex flex-wrap justify-between items-center">
              <p className="italic tracking-tighter capitalize">Barcode:</p>
              <p className="font-bold">{product.meta.barcode}</p>
            </div>
          }
        />
        <ProductCardComponent
          className="mx-auto w-64"
          description={
            <div className="flex flex-wrap justify-between items-center">
              <p className="italic tracking-tighter capitalize">Global SKU</p>
              <p className="font-bold">{product.sku}</p>
            </div>
          }
        />
      </TabsContent>
      {/* shipping policies */}
      <TabsContent
        value="shipping-policies"
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <ProductCardComponent
          className="w-full bg-transparent border-none shadow-none max-w-72"
          content={
            <div className="flex gap-2 items-center">
              <span className="p-2 rounded-lg bg-accent/10">
                <Truck className="size-5 text-accent" />
              </span>
              <div>
                <p className="font-semibold tracking-wide leading-6">
                  Standard Logistics Shipping
                </p>
                <p className="text-sm tracking-normal leading-5">
                  {product.shippingInformation}
                </p>
              </div>
            </div>
          }
        />
        <ProductCardComponent
          className="w-full bg-transparent border-none shadow-none max-w-72"
          content={
            <div className="flex gap-2 items-center">
              <span className="p-2 rounded-lg bg-accent/10">
                <ShieldCheck className="size-5 text-success" />
              </span>
              <div>
                <p className="font-semibold tracking-wide leading-6">
                  EnterPrise Warranty
                </p>
                <p className="text-sm tracking-normal leading-5">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
          }
        />
        <ProductCardComponent
          className="w-full bg-transparent border-none shadow-none max-w-72"
          content={
            <div className="flex gap-2 items-center">
              <span className="p-2 rounded-lg bg-accent/10">
                <PanelLeft className="size-5 text-warning" />
              </span>
              <div>
                <p className="font-semibold tracking-wide leading-6">
                  Return Policy
                </p>
                <p className="text-sm tracking-normal leading-5">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          }
        />
      </TabsContent>
      {/* reviews */}
      <TabsContent
        value="reviews"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* reviews */}

        {product.reviews.map((review, index) => (
          <ProductCardComponent
            key={index}
            className="w-full max-w-72"
            title={
              <p className="flex gap-4 items-center italic tracking-tighter capitalize">
                <span className="text-foreground">Name :</span>
                <span className="text-accent">{review.reviewerName}</span>
              </p>
            }
            description={
              <p className="flex gap-2 items-center">
                <span className="text-muted-foreground">Star :</span>
                <span className="flex gap-1 items-center">
                  <Star className="size-4" />
                  {review.rating}
                </span>
              </p>
            }
            content={
              <div className="flex flex-col gap-2 text-foreground">
                <p className="text-muted-foreground">
                  <span className="text-foreground">Review : </span>
                  {review.comment}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-foreground">Date : </span>
                  {new Date(review.date).toDateString()}
                </p>
              </div>
            }
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
