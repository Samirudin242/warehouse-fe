import React, { useState } from "react";

export default function ListAddressSkeleton() {
  return (
    <div>
      <div className="flex border p-2 rounded-md animate-pulse">
        <div className="space-y-2">
          <div className="w-32 h-5 bg-gray-300 rounded-md"></div>
          <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-64 h-4 bg-gray-300 rounded-md"></div>
        </div>
        <div className="ml-auto">
          <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
