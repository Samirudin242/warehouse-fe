import React from "react";

const SkeletonTable: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full h-10 bg-gray-200 animate-pulse rounded mb-4"></div>
      <div className="w-full border border-gray-300 rounded-lg">
        <div className="flex items-center p-4 border-b border-gray-300 bg-gray-100">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-1/4 h-6 bg-gray-200 animate-pulse rounded mx-2"
            ></div>
          ))}
        </div>
        <div>
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center p-4 border-b border-gray-300"
            >
              {[...Array(4)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-1/4 h-6 bg-gray-200 animate-pulse rounded mx-2"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
