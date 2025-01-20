import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white shadow-sm border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="h-4 w-32 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-3 w-full bg-gray-300 rounded-md mb-2"></div>
        <div className="h-3 w-4/5 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-3 w-3/5 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
