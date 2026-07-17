interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
export interface MetaData {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  availabilityStatus: string;
  images: string[];
  reviews: Review[];
  meta: MetaData;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
}
export interface ProductsDataType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryType {
  slug: string;
  name: string;
  url: string;
}

export interface StockStatusType {
  status: string;
  bg: string;
  border: string;
  stockType: "inStock" | "lowStock" | "outOfStock";
}
