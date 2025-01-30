import { useState, lazy, Suspense } from "react";

import { formatToRupiah } from "@/app/utils/formatPrice";
import { HiDotsVertical, HiX } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";

import moment from "moment";
import { OrderUser } from "@/types/Order";
import { Button, Spin, Tooltip, Image } from "antd";

const ModalOrderDetail = lazy(
  () => import("@/components/order/ModalOrderDetail")
);

const ModalUploadPayment = lazy(() => import("./ModalUploadPayment"));

type OrderCartProps = {
  order: OrderUser;
};

export default function OrderCart({ order }: OrderCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  return (
    <>
      <div className="flex flex-col w-11/12 m-auto md:flex-row justify-between items-start md:items-center py-6 px-10 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
        {/* Order Info */}
        <div className="flex items-start gap-4 w-full md:w-auto">
          <div className="relative  rounded-lg overflow-hidden">
            <img
              src={
                order.order_items[0]?.product.imageUrl ||
                "/placeholder-product.jpg"
              }
              alt={order.order_items[0]?.product.name}
              className="h-18 w-36 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {moment(order.order_date).format("DD MMM YYYY, HH:mm")}
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              {order.order_items.length} Items
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "PAYMENT_WAITING"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>
            {order.status == "PAYMENT_WAITING" && (
              <div>
                <button
                  onClick={() => setVisible(true)}
                  className="border mt-2 px-1 rounded bg-green-200 text-green-700 text-sm"
                >
                  Payment proof
                </button>
                <Image
                  width={200}
                  style={{ display: "none" }}
                  src={order?.payment?.payment_proof}
                  preview={{
                    visible,
                    scaleStep,
                    src: order?.payment?.payment_proof,
                    onVisibleChange: (value) => {
                      setVisible(value);
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-2 md:mt-0 md:text-center">
          <p className="text-sm text-gray-500">Total Pembayaran</p>
          <p className="text-xl font-bold text-gray-900">
            {formatToRupiah(order.total_amount)}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Detail Transaksi</Button>
          <Tooltip
            placement="bottom"
            color="white"
            title={
              <div className="text-black">
                <button className="flex border w-full items-center px-3 py-2 rounded bg-gray-200 hover:bg-red-200  font-bold">
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
            }
          >
            <button className="text-gray-400 hover:text-gray-600">
              <HiDotsVertical size={24} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {isModalOpen && (
        <Suspense fallback={<Spin />}>
          <ModalOrderDetail order={order} setIsModalOpen={setIsModalOpen} />
        </Suspense>
      )}
      <Suspense fallback={<Spin />}>
        <ModalUploadPayment
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          isPaymentModalOpen={isPaymentModalOpen}
          orderId={order.id}
        />
      </Suspense>
    </>
  );
}
