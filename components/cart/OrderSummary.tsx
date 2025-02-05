import React, { useState } from "react";
import { Button } from "antd";
import { formatToRupiah } from "@/utils/formatPrice";
import { FaArrowRight } from "react-icons/fa6";
import ListAddress from "./ListAddress";
import ListShipping from "./ListShipping";
import {
  SelectedAddress,
  NearestWarehouse,
  OptionShipping,
} from "@/types/Order";

import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import GlobalModal from "../modal/GlobalModal";
import axiosRequest from "@/hooks/useAxios";
import { useRouter } from "next/navigation";

type OrderProps = {
  totalOrder: number;
  listWarehouseId: string[];
  dataCart: any;
};

function OrderSummary({ totalOrder, listWarehouseId, dataCart }: OrderProps) {
  const { user, setLoading } = useAppContext();

  const userId = user?.id;
  const router = useRouter();

  const [bodyCheckout, setBodyCheckout] = useState<any>();

  const [openModalAddress, setOpenModalAddress] = useState<boolean>(false);
  const [openModalShipping, setOpenModalShipping] = useState<boolean>(false);
  const [openModalSubmit, setOpenModalSubmit] = useState<boolean>(false);

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [selectedUserAddress, setSelectedUserAddress] =
    useState<SelectedAddress>();
  const [nearestWarehouse, setNearestWarehouse] = useState<NearestWarehouse>();

  const [selectedUserShipping, setSelectedUserShipping] =
    useState<OptionShipping>();

  const [selectedCourier, setSelectedCourier] = useState<string>("");

  const handleCreateOrder = () => {
    const orders = dataCart?.map((d: any) => {
      return {
        product_id: d?.product?.id,
        quantity: d?.quantity,
        price: d?.price,
        size_id: d?.size?.id,
        color_id: d?.colors?.id,
        warehouse_id: d?.product?.warehouseProduct?.map((w: any) => {
          return w?.id;
        }),
      };
    });

    const body = {
      user_id: userId,
      order_date: new Date(),
      total_amount: totalOrder,
      total_shipping: selectedUserShipping?.cost[0].value,
      warehouse_id: nearestWarehouse?.id,
      user_address: selectedUserAddress?.address,
      latitude_user_address: selectedUserAddress?.latitude,
      longitude_user_address: selectedUserAddress?.longitude,
      payment_method: "",
      orders,
    };

    setBodyCheckout(body);
    setOpenModalSubmit(true);
    console.log(body);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setLoadingButton(true);
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlWarehouseService}/order`,
        method: "POST",
        body: bodyCheckout,
      });

      if (response?.data) {
        setLoadingButton(false);
        router.push(`/order/list-order/${user?.user_name}`);
      }
    } catch (error) {
      setLoadingButton(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">Order Summary</h1>
      <div className="space-y-3">
        <div className="flex justify-between">
          <h1 className="font-thin">Subtotal</h1>
          <h1 className="font-bold">{formatToRupiah(totalOrder, true)}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-thin">Discount (0%)</h1>
          <h1 className="font-bold text-red-400">Rp-</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-thin">Delivery Fee</h1>
          </div>

          <div className="ml-2">
            <div className="flex gap-2">
              <h2 className="font-thin">Address</h2>
              <Button
                className="font-thin"
                onClick={() => setOpenModalAddress(true)}
                size="small"
              >
                {selectedUserAddress?.address ? "Change" : "Select"} Address
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <p>{selectedUserAddress?.address}</p>
            </div>
          </div>

          {selectedUserAddress && (
            <div className="ml-2">
              <div className="flex gap-2">
                <h2 className="font-thin">Shipping</h2>
                <Button
                  size="small"
                  className="font-thin"
                  onClick={() => setOpenModalShipping(true)}
                >
                  {selectedUserShipping?.description
                    ? "Change Shipping"
                    : "Select Shipping"}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  {selectedUserShipping && (
                    <p>
                      {selectedCourier.toUpperCase()}{" "}
                      {selectedUserShipping.description}
                    </p>
                  )}
                </div>
                <div>
                  {selectedUserShipping && (
                    <p>{formatToRupiah(selectedUserShipping.cost[0].value)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border"></div>
      </div>
      <div className="mt-5 flex justify-between">
        <h1 className="font-bold">Total</h1>
        <h1 className="font-bold">
          {formatToRupiah(
            totalOrder +
              (selectedUserShipping?.cost[0]?.value
                ? selectedUserShipping?.cost[0]?.value
                : 0),
            true
          )}
        </h1>
      </div>
      <div
        className={`flex justify-center items-center w-full border text-center mt-10 rounded-3xl ${
          totalOrder == 0 ||
          !selectedUserShipping?.cost ||
          !selectedUserAddress?.id
            ? "bg-gray-300"
            : "bg-black"
        } cursor-pointer`}
      >
        {/* <a href="/order/checkout"> */}
        <button
          disabled={
            totalOrder == 0 ||
            !selectedUserShipping?.cost ||
            !selectedUserAddress?.id
          }
          className="flex gap-4 items-center py-3 px-10 text-white"
          onClick={handleCreateOrder}
        >
          Go to Checkout
          <span>
            <FaArrowRight />
          </span>
        </button>
        {/* </a> */}
      </div>
      <ListAddress
        isOpen={openModalAddress}
        onClose={() => setOpenModalAddress(false)}
        setSelectedUserAddress={setSelectedUserAddress}
        selectedAddressId={selectedUserAddress?.id}
        listWarehouseId={listWarehouseId}
        setSelectedNearestWarehouse={setNearestWarehouse}
      />
      <ListShipping
        isOpen={openModalShipping}
        onClose={() => setOpenModalShipping(false)}
        selectedAddress={selectedUserAddress}
        selectedWarehouse={nearestWarehouse}
        selectedOptionCourier={selectedUserShipping}
        setSelectedUserShipping={setSelectedUserShipping}
        selectedCourier={selectedCourier}
        setSelectedCourier={setSelectedCourier}
      />
      <GlobalModal
        isVisible={openModalSubmit}
        title="Create Order"
        content="Are you sure want to create an order ?"
        icon="checkout"
        onCancel={() => setOpenModalSubmit(false)}
        loadingButton={loadingButton}
        onOk={handleSubmit}
      />
    </div>
  );
}

export default OrderSummary;
