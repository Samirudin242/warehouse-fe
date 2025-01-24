"use client";
import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import CardCard from "@/components/cart/CardCard";
import EmptyCard from "@/components/cart/EmptyCard";
import OrderSummary from "@/components/cart/OrderSummary";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";

function Cart() {
  const { user } = useAppContext();

  const userId = user?.id;

  const { data, refresh, error, isLoading } = useHookSwr(
    userId ? `${configUrl.apiUrlProductService}/cart/${userId}` : null
  );

  const dataCart = data || [];

  useEffect(() => {
    if (userId) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
    }
  }, [userId, refresh]);

  return (
    <div className="px-20 text-black">
      <Breadcrumbs isHideLast={true} />
      {data.length ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">YOUR CART</h1>
          <div className="flex justify-between">
            {/* Cart*/}
            <div className="border p-5 rounded-2xl flex-initial w-3/5">
              <div className="mb-5">
                <CardCard />
              </div>
              <div className="w-full border"></div>
              <div className="mb-5 mt-5">
                <CardCard />
              </div>
              <div className="w-full border"></div>

              <div className="mt-5">
                <CardCard />
              </div>
            </div>
            {/* Order */}
            <div className="border p-5 rounded-2xl flex-initial w-1/3 h-fit">
              <OrderSummary />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
}

export default Cart;
