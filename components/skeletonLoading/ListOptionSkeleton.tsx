import React from "react";

export default function ListOptionSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-sm mb-2 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="text-right">
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
