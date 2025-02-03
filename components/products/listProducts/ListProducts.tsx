"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "antd";

import ProductCard from "../ProductCard";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

import ProductCardSkeleton from "../../skeletonLoading/ProductCardSkeleton";
import { useAppContext } from "@/contexts/useContext";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  totalSell: number;
  rating: number;
  imageUrl: string;
};

function ListProducts() {
  const { setLoading } = useAppContext();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const cleanedName = name ? name.replace(/^"|"$/g, "") : "";

  const url = name
    ? `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    : `${configUrl.apiUrlProductService}/product-public?size=${12}`;

  const { data, error, isLoading, refresh } = useHookSwr(url);

  const [curentPage, setCurrentPage] = useState<number>(1);

  const products = data?.content || [];

  useEffect(() => {
    refresh(
      `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    );
  }, [name]);

  useEffect(() => {
    setLoading(false);
  }, [data, name]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    refresh(
      `${configUrl.apiUrlProductService}/product-public?size=${12}&page=${page}`
    );
  };

  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <div className="text-black w-full">
      <div className="mb-4 text-xl font-bold">Casual</div>
      <div className="grid grid-cols-3 gap-y-3 w-full">
        {products?.map((product: Product, i: number) => {
          return (
            <div key={i}>
              <ProductCard
                imageSrc={product.imageUrl}
                title={product.name}
                rating={product.rating}
                price={product.price}
                id={product.id}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Pagination
          current={curentPage}
          defaultCurrent={1}
          defaultPageSize={12}
          total={data?.totalElements || 0}
          showSizeChanger={false}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ListProducts;
