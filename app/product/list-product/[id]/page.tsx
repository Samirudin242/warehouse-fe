"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import FilterProduct from "@/components/products/listProducts/filterProduct/FilterProduct";
import ListProducts from "@/components/products/listProducts/ListProducts";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";

import useHookSwr from "@/hooks/useSwr";

export default function ListProduct() {
  const router = useRouter();
  const { setLoading } = useAppContext();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const cleanedName = name ? name.replace(/^"|"$/g, "") : "";

  const [listFilter, setListFilter] = useState<any>({
    productName: "",
    categories: [],
  });

  const url = name
    ? `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    : `${configUrl.apiUrlProductService}/product-public?size=${12}`;

  const { data, error, isLoading, refresh } = useHookSwr(url);

  useEffect(() => {
    setLoading(false);
    refresh(
      `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    );

    if (cleanedName.length > 0) {
      const filterName = {
        productName: cleanedName,
      };
      setListFilter({
        ...listFilter,
        ...filterName,
      });
    }
  }, [name]);

  const handleFilterCategory = (id: string, name: string) => {
    const filter = listFilter?.categories;
    let isPush = filter.find((f: any) => f.id == id);

    if (!isPush) {
      filter.push({ id, name });
      const listId = filter?.map((f: any) => f.id).join(",");

      refresh(
        `${
          configUrl.apiUrlProductService
        }/product-public?size=${12}&name=${cleanedName}&categoryIds=${listId}`
      );
    }

    setListFilter({
      ...listFilter,
      categories: filter,
    });
  };

  const handleDeleteFilter = (id: string, type: string) => {
    if (type == "name") {
      router.push("/product/list-product/all");
      setListFilter({
        ...listFilter,
        productName: "",
      });
    } else {
      const filter = listFilter?.categories;
      let newFiler = filter.filter((f: any) => f.id != id);
      setListFilter({
        ...listFilter,
        categories: newFiler,
      });

      const listId = newFiler?.map((f: any) => f.id).join(",");

      if (listId) {
        refresh(
          `${
            configUrl.apiUrlProductService
          }/product-public?size=${12}&name=${cleanedName}&categoryIds=${listId}`
        );
      } else {
        refresh(
          `${
            configUrl.apiUrlProductService
          }/product-public?size=${12}&name=${cleanedName}`
        );
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="px-20">
      <Breadcrumbs isHideLast={true} />
      <div className="flex gap-10">
        <div>
          <FilterProduct
            handleFilterCategory={handleFilterCategory}
            listFilter={listFilter?.categories}
          />
        </div>
        <div className="w-full">
          <ListProducts
            data={data}
            isLoading={isLoading}
            refresh={refresh}
            listFilter={listFilter}
            handleDeleteFilter={handleDeleteFilter}
          />
        </div>
      </div>
    </div>
  );
}
