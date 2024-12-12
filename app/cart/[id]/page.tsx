import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import CardCard from "@/components/cart/CardCard";
import OrderSummary from "@/components/cart/OrderSummary";
import React from "react";

function Cart() {
  return (
    <div className="px-20 text-black">
      <Breadcrumbs isHideLast={true} />
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
    </div>
  );
}

export default Cart;
