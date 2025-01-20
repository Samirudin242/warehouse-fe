import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse p-4">
      {/* Breadcrumb */}
      <div className="h-4 w-40 bg-gray-300 rounded mb-6"></div>

      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Left Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="h-20 w-20 bg-gray-300 rounded"></div>
          <div className="h-20 w-20 bg-gray-300 rounded"></div>
          <div className="h-20 w-20 bg-gray-300 rounded"></div>
        </div>

        {/* Main Image */}
        <div className="flex-1 h-[300px] bg-gray-300 rounded"></div>

        {/* Product Details */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
          {/* Rating */}
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          {/* Price */}
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>
          {/* Color Options */}
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          {/* Sizes */}
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 w-16 bg-gray-300 rounded"></div>
              <div className="h-10 w-16 bg-gray-300 rounded"></div>
              <div className="h-10 w-16 bg-gray-300 rounded"></div>
              <div className="h-10 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
          {/* Add to Cart */}
          <div className="h-10 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
