import React, { useState } from "react";
import { Button } from "antd";
import { formatToRupiah } from "@/app/utils/formatPrice";
import { FaArrowRight } from "react-icons/fa6";
import ListAddress from "./ListAddress";
import ListShipping from "./ListShipping";
import { SelectedAddress, NearestWarehouse } from "@/types/Order";

type OrderProps = {
  totalOrder: number;
  listWarehouseId: string[];
};

function OrderSummary({ totalOrder, listWarehouseId }: OrderProps) {
  const [openModalAddress, setOpenModalAddress] = useState<boolean>(false);

  const [openModalShipping, setOpenModalShipping] = useState<boolean>(false);

  const [selectedUserAddress, setSelectedUserAddress] =
    useState<SelectedAddress>();
  const [nearestWarehouse, setNearestWarehouse] = useState<NearestWarehouse>();

  const [selectedUserShipping, setSelectedUserShipping] = useState<string>("");

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
                  Select Shipping
                </Button>
              </div>
              <div className="flex justify-between items-center">
                {selectedUserShipping && <p>{selectedUserShipping}</p>}
              </div>
            </div>
          )}
        </div>
        <div className="border"></div>
      </div>
      <div className="mt-5 flex justify-between">
        <h1 className="font-bold">Total</h1>
        <h1 className="font-bold">$467</h1>
      </div>
      <div className="flex justify-center items-center w-full border text-center mt-10 rounded-3xl bg-black cursor-pointer">
        <button
          disabled={totalOrder == 0}
          className="flex gap-4 items-center py-3 px-10 text-white"
        >
          Go to Checkout
          <span>
            <FaArrowRight />
          </span>
        </button>
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
      />
    </div>
  );
}

export default OrderSummary;
