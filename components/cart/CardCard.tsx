import { formatToRupiah } from "@/app/utils/formatPrice";
import React from "react";
import { MdDelete } from "react-icons/md";

type CartProps = {
  id: string;
  name: string;
  size: string;
  quantity: string;
  price: number;
  color: string;
  imageUrl: string;
};

function CardCard({
  id,
  name,
  size,
  quantity,
  color,
  price,
  imageUrl,
}: CartProps) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="bg-customGray overflow-hidden content-center rounded-lg">
          <img
            className="h-32 w-36 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
            src={imageUrl}
            width={100}
            height={50}
          />
        </div>
        <div className="ml-4">
          <h1 className="font-bold">{name}</h1>
          <div className="flex">
            <h3>Size: </h3>
            <h3 className="ml-3 font-thin">{size}</h3>
          </div>
          <div className="flex">
            <h3>Color: </h3>
            <h3 className="ml-3 font-thin">{color}</h3>
          </div>
          <div className="text-2xl font-bold mt-5">
            {formatToRupiah(price, true)}
          </div>
        </div>
      </div>
      <div className="flex flex-col content-between justify-between">
        <div className="self-end rounded-md px-1 hover:bg-red-100 cursor-pointer">
          <MdDelete className="text-red-600 text-2xl" />
        </div>
        <div className="flex justify-between border py-2 gap-5 px-4 rounded-3xl bg-customGray">
          <button className="hover:bg-gray-200 px-2 rounded-lg">-</button>
          <span>{quantity}</span>
          <button className="hover:bg-gray-200 px-2 rounded-lg">+</button>
        </div>
      </div>
    </div>
  );
}

export default CardCard;
