import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import FilterProduct from "@/components/products/listProducts/filterProduct/FilterProduct";
import ListProducts from "@/components/products/listProducts/ListProducts";
import React from "react";

export default function ListProduct() {
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
