"use client";
import React, { useState, useEffect } from "react";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import CardCard from "@/components/cart/CardCard";
import EmptyCard from "@/components/cart/EmptyCard";
import OrderSummary from "@/components/cart/OrderSummary";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import CartSkeleton from "@/components/skeletonLoading/CartSkeleton";

function Cart() {
  const { user } = useAppContext();

  const userId = user?.id;

  const [totalOrder, setTotalOrder] = useState<number>(0);

  const { data, refresh, error, isLoading } = useHookSwr(
    userId ? `${configUrl.apiUrlProductService}/cart/${userId}` : null
  );

  const [listWarehouseId, setListWarehouseId] = useState<string[]>([]);

  const dataCart = data || [];

  useEffect(() => {
    if (userId && !data) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
    }
  }, [userId]);

  useEffect(() => {
    const total = dataCart.reduce((acc: any, curr: any) => {
      return acc + curr?.price;
    }, 0);

    setTotalOrder(total);

    const listId = dataCart?.map((d: any) => {
      const ids = d?.product?.warehouseProduct?.map((w: any) => {
        return w.id;
      });

      return [...ids];
    });

    const flatId = listId?.flat();
    setListWarehouseId(flatId);
  }, [dataCart]);

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <div className="px-20 text-black">
      <Breadcrumbs isHideLast={true} />
      {dataCart.length && !isLoading ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">YOUR CART</h1>
          <div className="flex justify-between">
            {/* Cart*/}
            <div className="border p-5 rounded-2xl flex-initial w-3/5 h-fit">
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
              <OrderSummary
                totalOrder={totalOrder}
                listWarehouseId={listWarehouseId}
              />
            </div>
          </div>
        </div>
      ) : data?.length === 0 ? (
        <EmptyCard />
      ) : (
        <CartSkeleton />
      )}
    </div>
  );
}

export default Cart;
