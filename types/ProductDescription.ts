export type DescriptionProps = {
  id: string;
  name: string;
  description: string;
  rating: number;
  stock: number;
  price: Price;
  colors: Color[];
  sizes: Size[];
};

export type Price = {
  id: string;
  productId: string;
  currency: string;
  price: number;
  discountedValue: number;
  onSales: boolean;
};

export type Color = {
  id: string;
  product_id: string;
  color_id: string;
  color: string;
};

export type Size = {
  id: string;
  product_id: string;
  size_id: string;
  size: string;
};
