import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import FilterCategories from "./FilterCategories";
import FilterPrices from "./FilterPrices";

type FilterProductProps = {
  handleFilterCategory: (p: string, p2: string) => void;
  listFilter: any;
};

function FilterProduct({
  handleFilterCategory,
  listFilter,
}: FilterProductProps) {
  return (
    <div className="border w-80 rounded-xl p-3 text-black bg-white shadow-md">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-base font-bold">Filters</h1>
        <IoFilterSharp className="text-xl" />
      </div>
      <FilterCategories
        handleFilterCategory={handleFilterCategory}
        listFilter={listFilter}
      />
      <FilterPrices min={0} max={10000000} />
    </div>
  );
}

export default FilterProduct;
