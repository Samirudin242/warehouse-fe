"use client";

import React, { useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";

import { Spin } from "antd";

import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import { useAppContext } from "@/contexts/useContext";
import Cookies from "js-cookie";

export default function OrderIcon() {
  const token = Cookies.get("accessToken");
  const { user } = useAppContext();

  const userId = user?.id;

  const { data, refresh, error, isLoading } = useHookSwr(
    userId && token ? `${configUrl.apiUrlProductService}/cart/${userId}` : null
  );

  useEffect(() => {
    if (userId && !data && token) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
    }
  }, [userId]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="flex items-center">
      <TbTruckDelivery className="w-7 h-7 text-black" />
      {data?.length > 0 && (
        <div className="text-red-500 border-red-500 rounded-xl text-xs px-1 -ml-2 bg-red-200">
          {data.length}
        </div>
      )}
    </div>
  );
}
