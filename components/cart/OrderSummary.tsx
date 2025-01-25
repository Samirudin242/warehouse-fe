import { formatToRupiah } from "@/app/utils/formatPrice";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

type OrderProps = {
  totalOrder: number;
};

function OrderSummary({ totalOrder }: OrderProps) {
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
          <h1 className="font-bold">$15</h1>
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
    </div>
  );
}

export default OrderSummary;
