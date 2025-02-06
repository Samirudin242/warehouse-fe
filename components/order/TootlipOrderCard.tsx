import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { MdOutlineUploadFile, MdOutlineRateReview } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/useContext";

type TooltipProps = {
  setIsPaymentModalOpen: (p: boolean) => void;
  status: string;
  setConfirmReceived: (type: string) => void;
  setCancelOrder: (type: string) => void;
  setOpenModalReview: () => void;
};

export default function TootlipOrderCard({
  setIsPaymentModalOpen,
  status,
  setConfirmReceived,
  setCancelOrder,
  setOpenModalReview,
}: TooltipProps) {
  const { setLoading } = useAppContext();

  const router = useRouter();

  return (
    <div>
      {status == "PAYMENT_WAITING" ? (
        <div className="text-black">
          <button
            onClick={() => setCancelOrder("cancel")}
            className="flex border w-full items-center px-3 py-2 rounded bg-gray-200 hover:bg-red-200  font-bold"
          >
            <MdCancel className="text-red-500 text-2xl" />
            <span className="ml-2">Cancel</span>
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="flex mt-3 border w-full items-center px-3 py-2 rounded bg-gray-200 hover:bg-green-200 font-bold"
          >
            <MdOutlineUploadFile className="text-green-500 text-2xl" />
            <span className="ml-2">Upload payment</span>
          </button>
        </div>
      ) : status == "SHIPPING" ? (
        <div>
          <div className="text-black">
            <button
              onClick={() => setConfirmReceived("received")}
              className="flex border w-full items-center px-3 py-2 rounded bg-gray-200 hover:bg-green-300  font-bold"
            >
              <FaPeopleCarryBox className="text-green-500 text-2xl" />
              <span className="ml-2">Order Received</span>
            </button>
          </div>
        </div>
      ) : status === "COMPLETED" ? (
        <div>
          <div className="text-black">
            <button
              onClick={setOpenModalReview}
              className="flex border w-full items-center px-3 py-2 rounded bg-gray-200 hover:bg-blue-300  font-bold"
            >
              <MdOutlineRateReview className="text-blue-500 text-2xl" />
              <span className="ml-2">Review Product</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-black">
            <button
              onClick={() => {
                router.push("/product/list-product/all");
                setLoading(true);
              }}
              className="flex border w-full items-center px-3 py-2 rounded bg-gray-200 font-bold"
            >
              <AiOutlineShopping className="text-black text-2xl" />
              <span className="ml-2">Buy Another Product</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
