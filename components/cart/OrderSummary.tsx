import React, { useState } from "react";
import { Button } from "antd";
import { formatToRupiah } from "@/app/utils/formatPrice";
import { FaArrowRight } from "react-icons/fa6";
import ListAddress from "./ListAddress";

type OrderProps = {
  totalOrder: number;
};

function OrderSummary({ totalOrder }: OrderProps) {
  const [openModalAddress, setOpenModalAddress] = useState<boolean>(false);

  const [selectedUserAddress, setSelectedUserAddress] = useState<string>(
    "caa9476f-4a02-48f2-9185-5013fc913139"
  );

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
        <div className="flex justify-between">
          <h1 className="font-thin">Delivery Fee</h1>
          {false ? (
            <h1 className="font-bold">$15</h1>
          ) : (
            <Button onClick={() => setOpenModalAddress(true)}>
              {" "}
              Select Address
            </Button>
          )}
        </div>
        <div className="border"></div>
      </div>
      <div className="mt-5 flex justify-between">
        <h1 className="font-bold">Total</h1>
        <h1 className="font-bold">$467</h1>
      </div>
      <div className="flex justify-center items-center w-full border text-center mt-10 rounded-3xl bg-black cursor-pointer">
        <button className="flex gap-4 items-center py-3 px-10 text-white">
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
        selectedAddressId={selectedUserAddress}
      />
    </div>
  );
}

export default OrderSummary;
