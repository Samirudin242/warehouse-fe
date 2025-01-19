const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="w-64 h-80 bg-gray-200 rounded-lg animate-pulse flex flex-col space-y-4 p-4"
        >
          <div className="w-full h-48 bg-gray-300 rounded"></div>

          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

          <div className="h-8 w-full bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
