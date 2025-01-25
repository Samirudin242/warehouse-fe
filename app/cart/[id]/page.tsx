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
    if (userId && !data) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
    }
  }, [userId]);

  return (
    <div className="px-20 text-black">
      <Breadcrumbs isHideLast={true} />
      {dataCart.length ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">YOUR CART</h1>
          <div className="flex justify-between">
            {/* Cart*/}
            <div className="border p-5 rounded-2xl flex-initial w-3/5">
              {dataCart?.map((cart: any, i: number) => {
                return (
                  <div key={i}>
                    <div className="mb-5">
                      <CardCard
                        id={cart?.id}
                        name={cart?.product?.name}
                        size={cart?.size?.size}
                        sizeId={cart?.size?.id}
                        color={cart?.colors?.originalName}
                        colorId={cart?.colors?.id}
                        price={cart?.price}
                        quantity={cart?.quantity}
                        imageUrl={cart?.product?.imageUrl}
                        productId={cart?.product?.id}
                        stock={cart?.product?.stock}
                        refresh={refresh}
                      />
                    </div>
                    {i != dataCart?.length - 1 && (
                      <div className="w-full border mb-4"></div>
                    )}
                  </div>
                );
              })}
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
