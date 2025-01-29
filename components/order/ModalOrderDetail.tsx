import { OrderUser } from "@/types/Order";
import React from "react";
import { HiX } from "react-icons/hi";
import { formatToRupiah } from "@/app/utils/formatPrice";
import GoogleMapPicker from "../location/GoogleMapPicker";

type OrderCartProps = {
  order: OrderUser;
  setIsModalOpen: (isOpen: boolean) => void;
};
export default function ModalOrderDetail({
  order,
  setIsModalOpen,
}: OrderCartProps) {
  const locatiton = {
    lat: order?.user_latitude,
    lng: order?.user_longitude,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Detail Transaksi</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Order Items */}
          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex gap-4 py-2 items-center">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.product.imageUrl || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    className="border h-20 w-36 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {/* {item.productColor.originalName} / {item.productSize.size} */}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm">
                      {item.quantity} ×{" "}
                      {formatToRupiah(item.price / item.quantity)}
                    </p>
                    <p className="font-medium">{formatToRupiah(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="mt-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatToRupiah(order.total_amount - order.total_shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Shipping</span>
              <span className="font-medium">
                {formatToRupiah(order.total_shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-800 font-semibold">Total</span>
              <span className="text-gray-800 font-semibold">
                {formatToRupiah(order.total_amount)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Delivery Address
            </h4>
            <GoogleMapPicker
              defaultLocation={locatiton}
              disabledClickMap={true}
            />
            <p className="text-sm text-gray-600 mt-3">{order.user_address}</p>
          </div>

          {/* Payment Info */}
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Payment
            </h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Payment Method</span>
              <span>{order.payment.payment_type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
