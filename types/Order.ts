export type SelectedAddress = {
  id: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  address: string;
  postal_code: string;
  name: string;
  phone_number: string;
  latitude: number;
  longitude: number;
};

export type NearestWarehouse = {
  id: string;
  name: string;
  address: string;
  province_id: string;
  city_id: string;
  latitude: number;
  longitude: number;
};

export type ShippingProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress?: SelectedAddress;
  selectedWarehouse?: NearestWarehouse;
  setSelectedUserShipping: (obj: any) => void;
  selectedOptionCourier?: OptionShipping;
  selectedCourier: string;
  setSelectedCourier: (courier: string) => void;
};

export type OptionShipping = {
  service: string;
  description: string;
  cost: Cost[];
};

export type Cost = {
  value: number;
  etd: string;
  note: string;
};

export type Order = {
  id: string;
  order_date: string;
  total_amount: number;
  status: string;
};

export type OrderUser = {
  id: string;
  order_date: string;
  total_amount: number;
  total_shipping: number;
  user_address: string;
  user_latitude: number;
  user_longitude: number;
  status: string;
  payment: Payment;
  order_items: OrderItem[];
};

type Payment = {
  id: string;
  payment_type: string;
  payment_date: string;
  payment_proof: string;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  warehouse_id: string;
  product: Product;
  productColor: ProductColor;
  productSize: ProductSize;
};

type Product = {
  id: string;
  sku: string;
  name: string;
  imageUrl: string;
};

type ProductSize = {
  id: string;
  originalName: string;
};

type ProductColor = {
  id: string;
  size: string;
};
