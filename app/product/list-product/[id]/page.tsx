import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import FilterProduct from "@/components/products/list-products/FilterProduct";
import ListProducts from "@/components/products/list-products/ListProducts";
import React from "react";

export default function ListProduct() {
  return (
    <div className="px-20">
      <Breadcrumbs isHideLast={true} />
      {/* Filter */}
      <div className="flex">
        <div>
          <FilterProduct />
        </div>
        {/* List Product */}
        <div>
          <ListProducts />
        </div>
      </div>
    </div>
  );
}
