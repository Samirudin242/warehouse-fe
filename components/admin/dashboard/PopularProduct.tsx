"use client";

import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import { formatToRupiah } from "@/utils/formatPrice";
import React from "react";

type Product = {
  name: string;
  photo: string;
  totalProfit: number;
};

const PopularProductsList = () => {
  const { data, refresh } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/popular-products?size=5`,
    {
      refreshInterval: 10000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const products = data?.content;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Popular Products</h1>
      <ul className="space-y-4">
        {products?.map((product: any, index: number) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-2 border rounded-md shadow-md bg-white"
          >
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-16 h-16 object-contain rounded-md aspect-square"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product?.name}</h3>
              <p className="text-gray-500">
                Total Profit:{" "}
                <span className="text-black">
                  {formatToRupiah(product?.totalSell * product?.price)}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularProductsList;
