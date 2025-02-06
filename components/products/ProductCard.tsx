"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatToRupiah } from "@/utils/formatPrice";
import Image from "next/image";
import { PiStarFill } from "react-icons/pi";
import { setCookie } from "nookies";
import { useAppContext } from "@/contexts/useContext";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  rating?: number;
  imageSrc: string;
  totalSell?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  rating,
  imageSrc,
  totalSell,
}) => {
  const { setLoadingAnimation } = useAppContext();

  const router = useRouter();

  const handleClickCard = () => {
    setLoadingAnimation(true);
    setCookie(null, "productId", id, { path: "/" });
    router.push(`/product/product-detail/${title}`);
  };

  return (
    <div
      onClick={handleClickCard}
      className="w-64 bg-white rounded-lg overflow-hidden cursor-pointer
        border hover:border-gray-200 transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-1.5 group"
    >
      <div className="bg-customGray overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-64 aspect-[3/2] object-contain mix-blend-multiply 
            transform transition-transform duration-500 ease-in-out 
            group-hover:scale-105"
          width={200}
          height={200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      <div className="p-4 space-y-2">
        <h3
          className="text-base font-semibold text-gray-800 truncate 
          transition-colors group-hover:text-blue-600"
        >
          {title}
        </h3>

        <div className="text-md font-bold text-gray-900 animate-pulse-on-change">
          {formatToRupiah(price, true)}
        </div>

        <div
          className="flex items-center gap-3 text-gray-500 
          transition-opacity hover:opacity-80"
        >
          <div className="flex items-center gap-1">
            <PiStarFill className="text-amber-400 animate-[ping_1s_ease-in-out_0.5]" />
            <span className="animate-fade-in">{rating || "not rated yet"}</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="animate-fade-in">{totalSell || 0} sold</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
