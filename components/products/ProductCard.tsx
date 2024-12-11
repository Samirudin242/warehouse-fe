import React from "react";
import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";

interface ProductCardProps {
  title: string;
  price: number;
  rating?: number;
  reviews?: number;
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  rating,
  reviews,
  imageSrc,
}) => {
  return (
    <div className="w-64 bg-white hover:shadow-md rounded-lg overflow-hidden hover:border">
      <div className="bg-customGray overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-64 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center mb-2">
          {[...Array(4)].map((_, i) => (
            <IoStarSharp key={i} className="text-amber-300" />
          ))}
          {[...Array(1)].map((_, i) => (
            <IoStarHalfSharp className="text-amber-300" />
          ))}
          <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
        </div>

        <div className="text-xl font-bold text-gray-900">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
