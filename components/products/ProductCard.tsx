"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatToRupiah } from "@/app/utils/formatPrice";
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
  const { setLoading } = useAppContext();

  const router = useRouter();

  const handleClickCard = () => {
    setLoading(true);
    setCookie(null, "productId", id, { path: "/" });
    router.push(`/product/product-detail/${title}`);
  };

  return (
    <div
      onClick={handleClickCard}
      className="w-64 bg-white hover:shadow-md rounded-lg overflow-hidden hover:border cursor-pointer"
    >
      <div className="bg-customGray overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-64 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
          width={200}
          height={200}
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">
          {title}
        </h3>

        <div className="text-md font-bold text-gray-900">
          {formatToRupiah(price, true)}
        </div>

        <div className="flex justify-items-center mb-2 gap-3 mt-3 text-gray-500">
          <div className="flex justify-center items-center gap-1">
            <PiStarFill className="text-amber-400" />
            {rating ? rating : "not rated yet"}
          </div>
          <div>|</div>
          <div>{totalSell ? totalSell : 0} sold</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
