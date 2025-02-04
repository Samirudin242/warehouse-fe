"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import FilterProduct from "@/components/products/listProducts/filterProduct/FilterProduct";
import ListProducts from "@/components/products/listProducts/ListProducts";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";

import useHookSwr from "@/hooks/useSwr";

export default function ListProduct() {
  const { setLoading } = useAppContext();

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const cleanedName = name ? name.replace(/^"|"$/g, "") : "";

  const [listFilter, setListFilter] = useState<any>({
    name: "",
    categories: [],
  });

  const url = name
    ? `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    : `${configUrl.apiUrlProductService}/product-public?size=${12}`;

  const { data, error, isLoading, refresh } = useHookSwr(url);

  useEffect(() => {
    refresh(
      `${
        configUrl.apiUrlProductService
      }/product-public?size=${12}&name=${cleanedName}`
    );

    if (cleanedName) {
      const filterName = {
        name: cleanedName,
      };
      setListFilter({
        ...listFilter,
        listFilter,
      });
    }
  }, [name]);

  const handleFilterCategory = (id: string, name: string) => {};

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="px-20">
      <Breadcrumbs isHideLast={true} />
      {/* Filter */}
      <div className="flex gap-10">
        <div>
          <FilterProduct />
        </div>
        {/* List Product */}
        <div className="w-full">
          <ListProducts
            data={data}
            isLoading={isLoading}
            refresh={refresh}
            listFilter={listFilter}
          />
        </div>
      </div>
    </div>
  );
}
