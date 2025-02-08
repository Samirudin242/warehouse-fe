"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { FiFilter, FiPackage, FiTag, FiX } from "react-icons/fi";

import ProductCard from "../ProductCard";
import { configUrl } from "@/config/configUrl";

import ProductCardSkeleton from "../../skeletonLoading/ProductCardSkeleton";
import { useAppContext } from "@/contexts/useContext";
import Image from "next/image";

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
  handleDeleteFilter: (id: string, type: string) => void;
};

function ListProducts({
  data,
  isLoading,
  refresh,
  listFilter,
  handleDeleteFilter,
}: ListProductProps) {
  const { setLoading } = useAppContext();
  const [curentPage, setCurrentPage] = useState<number>(1);

  const products = data?.content || [];

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    refresh(
      `${configUrl.apiUrlProductService}/product-public?size=${12}&page=${
        page - 1
      }`
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <div className="text-black w-full">
      <div className="w-full rounded-lg bg-white p-4 ">
        {listFilter?.productName?.length > 0 ||
          (listFilter?.categories?.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <FiFilter className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Filter Information</h2>
            </div>
          ))}

        {listFilter?.productName && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100 w-fit">
            <FiPackage className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Product Name:{" "}
              <span className="font-normal text-gray-600">
                {listFilter.productName}
                <button
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-blue-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFilter("", "name");
                  }}
                >
                  <FiX className="h-3 w-3 text-blue-500 hover:text-blue-700" />
                </button>
              </span>
            </span>
          </div>
        )}

        {listFilter?.categories && listFilter.categories.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiTag className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-700">
                Selected Categories:
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {listFilter.categories.map(
                (category: { name: string; id: string }) => (
                  <div
                    key={category.id}
                    className="group flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 pr-2 transition-all hover:bg-blue-100"
                  >
                    <FiTag className="h-3 w-3 text-blue-500" />
                    <span className="text-sm text-blue-700">
                      {category.name}
                    </span>
                    <button
                      className="ml-1 rounded-full p-0.5 transition-colors hover:bg-blue-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFilter(category?.id, "category");
                      }}
                    >
                      <FiX className="h-3 w-3 text-blue-500 hover:text-blue-700" />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {products?.length == 0 ? (
          <div className="mt-auto place-items-center">
            <Image
              src={"/empty-cart.png"}
              width={300}
              height={300}
              alt="empty product"
            />
            <div className="font-bold">No Product Found ... </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-y-3 w-full">
              {products?.map((product: Product, i: number) => {
                return (
                  <div
                    key={i}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ProductCard
                      imageSrc={product.imageUrl}
                      title={product.name}
                      rating={product.rating}
                      price={product.price}
                      id={product.id}
                      totalSell={product?.totalSell}
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
        )}
      </div>
    </div>
  );
}

export default ListProducts;
