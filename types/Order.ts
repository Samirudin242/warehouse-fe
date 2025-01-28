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
