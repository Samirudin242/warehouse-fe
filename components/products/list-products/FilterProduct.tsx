import React from "react";
import { IoFilterSharp } from "react-icons/io5";

function FilterProduct() {
  return (
    <div className="border w-80 rounded-xl p-3">
      <div className="flex justify-between content-center border-b pb-4">
        <h1 className="text-base font-bold">Filters</h1>
        <IoFilterSharp className="text-xl" />
      </div>
    </div>
  );
}

export default FilterProduct;
