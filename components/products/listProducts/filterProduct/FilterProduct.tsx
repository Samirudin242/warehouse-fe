import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import FilterCategories from "./FilterCategories";
import FilterPrices from "./FilterPrices";

function FilterProduct() {
  return (
    <div className="border w-80 rounded-xl p-3 text-black bg-white shadow-md">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-base font-bold">Filters</h1>
        <IoFilterSharp className="text-xl" />
      </div>
      <FilterCategories />
      <FilterPrices min={0} max={10000000} />
    </div>
  );
}

export default FilterProduct;
