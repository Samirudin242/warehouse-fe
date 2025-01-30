import React from "react";

export const DashboardSkeleton = ({
  type,
}: {
  type: "overview" | "chart" | "list";
}) => {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-4">
      {type === "overview" && (
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      )}

      {type === "chart" && <div className="h-64 bg-gray-300 rounded"></div>}

      {type === "list" && (
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-300 rounded"></div>
          ))}
        </div>
      )}
    </div>
  );
};
