"use client";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import FilterProduct from "@/components/products/listProducts/filterProduct/FilterProduct";
import ListProducts from "@/components/products/listProducts/ListProducts";
import { useAppContext } from "@/contexts/useContext";
import React, { useEffect } from "react";

export default function ListProduct() {
  const { setLoading } = useAppContext();

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
          <ListProducts />
        </div>
      </div>
    </div>
  );
}
