import { useState, lazy, Suspense } from "react";
import moment from "moment";
import { Button, Spin, Tooltip, Image } from "antd";

import { HiDotsVertical } from "react-icons/hi";

import { formatToRupiah } from "@/utils/formatPrice";
import { OrderUser } from "@/types/Order";
import TootlipOrderCard from "./TootlipOrderCard";
import GlobalModal from "../modal/GlobalModal";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import ReviewModal from "./ReviewModal";

const ModalOrderDetail = lazy(
  () => import("@/components/order/ModalOrderDetail")
);

const ModalUploadPayment = lazy(() => import("./ModalUploadPayment"));

type OrderCartProps = {
  order: OrderUser;
  refresh: (url: string) => void;
  userId: string;
  setFilter: (status: any) => void;
};

export default function OrderCart({
  order,
  refresh,
  userId,
  setFilter,
}: OrderCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [confirmReceived, setConfirmReceived] = useState<boolean>(false);
  const [cancelOrder, setCancelOrder] = useState<boolean>(false);
  const [bodyUpdateStatus, setBodyUpdateStatus] = useState<any>();

  const [openModalReview, setOpenModalReview] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  const handleOpenModaUpdateStatus = (type: string) => {
    const body = {
      order_id: order?.id,
      order_date: order?.order_date,
    };
    setBodyUpdateStatus(body);
    if (type == "cancel") {
      setCancelOrder(true);
      setConfirmReceived(false);
    } else {
      setCancelOrder(false);
      setConfirmReceived(true);
    }
  };

  const handleReceivedOrder = async () => {
    const url = cancelOrder ? "cancel-order" : "received-order";
    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlWarehouseService}/order/${url}`,
      method: "POST",
      body: bodyUpdateStatus,
    });

    if (response) {
      refresh(`${configUrl.apiUrlWarehouseService}/order/${userId}`);
      setConfirmReceived(false);
      setFilter(cancelOrder ? "CANCELLED" : "COMPLETED");
    }
  };

  const productImageUrl =
    order?.order_items?.[0]?.product?.imageUrl || "/placeholder-product.jpg";

  const productName =
    order?.order_items?.[0]?.product?.name || "Unknown Product";

  return (
    <>
      <div className="flex flex-col w-11/12 m-auto md:flex-row justify-between items-start md:items-center py-6 px-10 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
        {/* Order Info */}
        <div className="flex items-start gap-4 w-full md:w-auto">
          <div className="relative  rounded-lg overflow-hidden">
            <img
              src={productImageUrl}
              alt={productName}
              className="h-18 w-36 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {moment(order?.order_date).format("DD MMM YYYY, HH:mm")}
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              {order?.order_items?.length} Items
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-2 rounded text-xs font-medium ${
                  order?.status === "PAYMENT_WAITING"
                    ? "bg-yellow-100 text-yellow-800"
                    : order?.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order?.status?.replace("_", " ")}
              </span>
            </div>
            {order?.status == "PAYMENT_WAITING" &&
              order?.payment?.payment_proof && (
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
            {formatToRupiah(order?.total_amount)}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Detail Transaksi</Button>
          <Tooltip
            placement="bottom"
            color="white"
            title={
              <TootlipOrderCard
                setIsPaymentModalOpen={setIsPaymentModalOpen}
                status={order?.status}
                setConfirmReceived={handleOpenModaUpdateStatus}
                setCancelOrder={handleOpenModaUpdateStatus}
                setOpenModalReview={() => setOpenModalReview(true)}
              />
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
          refresh={refresh}
          userId={userId}
        />
      </Suspense>
      <GlobalModal
        isVisible={confirmReceived || cancelOrder}
        content={
          <div className="text-black font-bold">
            {cancelOrder
              ? "Are you sure want to cancel the order"
              : "Is your order successfully delivered?"}
          </div>
        }
        onCancel={() => {
          setConfirmReceived(false);
          setCancelOrder(false);
        }}
        icon={cancelOrder ? "cancel" : "deliver"}
        onOk={handleReceivedOrder}
      />

      <ReviewModal
        isOpen={openModalReview}
        handleCancel={() => setOpenModalReview(false)}
        order={order}
        // onSubmit={}
      />
    </>
  );
}
