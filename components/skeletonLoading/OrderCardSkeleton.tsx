import React from "react";

function OrderCardSkeleton() {
  return (
    <div className="flex flex-col w-11/12 m-auto md:flex-row justify-between items-start md:items-center py-6 px-10 border rounded-xl shadow-sm bg-white animate-pulse">
      <div className="flex items-start gap-4 w-full md:w-auto">
        <div className="relative rounded-lg overflow-hidden bg-gray-200 h-18 w-36 aspect-[3/2]" />
        <div className="flex-1">
          <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
          <div className="h-6 w-20 bg-gray-300 rounded mb-2" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="mt-2 md:mt-0 md:text-center">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <div className="h-10 w-32 bg-gray-300 rounded" />
        <div className="h-10 w-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
