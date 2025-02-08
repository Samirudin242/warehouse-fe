"use client";

import React, { useState, useEffect } from "react";

import OrderCart from "@/components/order/OrderCart";
import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import { OrderUser } from "@/types/Order";
import OrderCardSkeleton from "@/components/skeletonLoading/OrderCardSkeleton";

type Order = {
  id: number;
  status: "berhasil" | "berlangsung" | "tidak_berhasil" | "e_tiket";
  date: string;
  description: string;
  total: string;
  type: string;
  detail: string;
};

function ListOrderPage() {
  const { user, setLoading } = useAppContext();

  const userId = user?.id;

  const [filter, setFilter] = useState<
    | "All Transaction"
    | "PAYMENT_WAITING"
    | "SHIPPING"
    | "COMPLETED"
    | "CANCELLED"
  >("All Transaction");

  const { data, refresh, error, isLoading } = useHookSwr(
    userId ? `${configUrl.apiUrlWarehouseService}/order/${userId}` : null,
    {
      refreshInterval: 3000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setLoading(false);
    if (userId && !data) {
      refresh(`${configUrl.apiUrlWarehouseService}/order/${userId}`);
    }
  }, [userId]);

  const filteredOrders =
    filter === "All Transaction"
      ? data
      : data.filter((order: any) => order.status === filter);

  return (
    <div className="p-6 text-black">
      <Breadcrumbs isHideLast={true} />
      <h1 className="text-2xl font-bold mb-6">Order List</h1>

      {/* Filter Bar */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          "All Transaction",
          "PAYMENT_WAITING",
          "SHIPPING",
          "COMPLETED",
          "CANCELLED",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-full border ${
              filter === status
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="grid gap-6">
        {filteredOrders?.length > 0 ? (
          filteredOrders?.map((order: OrderUser) => (
            <OrderCart
              order={order}
              userId={userId}
              refresh={refresh}
              setFilter={setFilter}
            />
          ))
        ) : data?.length == 0 || filteredOrders?.length == 0 ? (
          <div className="m-auto">
            <p className="text-gray-500 mt-3">
              No orders found for the selected filter.
            </p>
            <img src="/images/empty-cart.png" width={400} />
          </div>
        ) : (
          <OrderCardSkeleton />
        )}
      </div>
    </div>
  );
}

export default ListOrderPage;
