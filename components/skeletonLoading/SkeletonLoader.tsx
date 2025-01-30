"use client";

import React from "react";

export const SkeletonLoader = ({ type }: { type: string }) => {
  const getSkeleton = () => {
    switch (type) {
      case "carousel":
        return <div className="animate-pulse h-96 bg-gray-200 rounded-xl" />;
      case "product-list":
        return (
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-1/4 rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        );
      case "categories":
        return <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />;
      case "comments":
        return (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        );
      default:
        return <div className="animate-pulse bg-gray-200 rounded" />;
    }
  };

  return getSkeleton();
};
