"use client";
import React, { useState } from "react";
import { Pagination } from "antd";

import ProductCard from "../ProductCard";
import { configUrl } from "@/config/configUrl";

import ProductCardSkeleton from "../../skeletonLoading/ProductCardSkeleton";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  totalSell: number;
  rating: number;
  imageUrl: string;
};

type ListProductProps = {
  data: any;
  isLoading: boolean;
  refresh: (url: string) => void;
  listFilter: any;
};

function ListProducts({
  data,
  isLoading,
  refresh,
  listFilter,
}: ListProductProps) {
  const [curentPage, setCurrentPage] = useState<number>(1);

  const products = data?.content || [];

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
      <div className="mb-4 text-xl font-bold">{JSON.stringify(listFilter)}</div>
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
