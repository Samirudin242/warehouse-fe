import "react";

const CartSkeleton = () => (
  <div className="px-20 text-black animate-pulse">
    {/* Breadcrumbs */}
    <div className="h-6 w-40 bg-gray-300 rounded mb-6"></div>
    <div>
      {/* Heading Skeleton */}
      <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
      <div className="flex justify-between">
        {/* Cart Skeleton */}
        <div className="border p-5 rounded-2xl flex-initial w-3/5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="mb-5">
              <div className="flex items-center mb-4">
                <div className="h-20 w-20 bg-gray-300 rounded-md mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              {index !== 2 && <div className="w-full border my-4"></div>}
            </div>
          ))}
        </div>
        {/* Order Summary Skeleton */}
        <div className="border p-5 rounded-2xl flex-initial w-1/3 h-fit">
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-3/4 bg-gray-300 rounded mb-2"
            ></div>
          ))}
          <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
        </div>
      </div>
    </div>
  </div>
);

export default CartSkeleton;
