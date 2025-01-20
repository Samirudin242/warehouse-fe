"use client";
import { formatToRupiah } from "@/app/utils/formatPrice";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";

type DescriptionProps = {
  id: string;
  name: string;
  description: string;
  rating: number;
  stock: number;
  price: Price;
  colors: Color[];
  sizes: Size[];
};

type Price = {
  id: string;
  productId: string;
  currency: string;
  price: number;
  discountedValue: number;
  onSales: boolean;
};

type Color = {
  id: string;
  product_id: string;
  color_id: string;
  color: string;
};

type Size = {
  id: string;
  product_id: string;
  size_id: string;
  size: string;
};

export default function ProductDetailDescription({
  id,
  name,
  description,
  price,
  colors,
  sizes,
  rating,
  stock,
}: DescriptionProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [totalProduct, setTotalProduct] = useState<number>(1);

  const handleSelectColor = (id: string) => {
    setSelectedColor(id);
  };

  const handleSelectSize = (id: string) => {
    setSelectedSize(id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      {rating && (
        <div className="flex gap-2">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <FaStar key={i} className="text-amber-300 text-xl" />
          ))}
          <span className="text-base text-gray-500 ml-2">4/5</span>
        </div>
      )}
      <div className="flex gap-4">
        <h1 className="text-xl font-bold">
          {formatToRupiah(price?.price, true)}
        </h1>
        {/* <h1 className="text-xl font-bold text-gray-300 line-through	">$300</h1>
        <h1 className="border px-2 rounded-xl bg-red-100 text-red-500">-40%</h1> */}
      </div>
      <div className="mt-2">
        <p className="font-thin">{description}</p>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3">
        <h3 className="font-thin text-sm">Select Colors</h3>
        <div className="flex flex-wrap gap-3 mt-2">
          {colors?.map((color) => (
            <button
              key={color.id}
              className={`rounded-full w-10 h-10 border ${
                selectedColor == color.id ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                background:
                  color.color === "multi"
                    ? "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)"
                    : color.color,
                color:
                  color.color === "multi" ||
                  ["white", "yellow", "gold", "beige"].includes(color.color)
                    ? "#000"
                    : "#FFF",
              }}
              onClick={() => handleSelectColor(color.id)}
            ></button>
          ))}
        </div>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3">
        <h3 className="font-thin text-sm">Choose Size</h3>
        <div className="flex gap-3 mt-2">
          {sizes?.map((size) => (
            <button
              key={size?.id}
              className={`rounded-full px-4 py-2 text-sm ${
                selectedSize.includes(size.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectSize(size.id)}
            >
              {size?.size}
            </button>
          ))}
        </div>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3 flex w-full gap-5">
        <div>Stock total: {stock}</div>
        <div className="px-5 flex content-center align-middle border gap-16 rounded-3xl py-2 bg-customGray">
          <button
            onClick={() => {
              if (totalProduct > 1) {
                setTotalProduct(totalProduct - 1);
              }
            }}
            className="hover:bg-gray-200 px-2 rounded-lg"
          >
            -
          </button>
          <div>{totalProduct}</div>
          <button
            onClick={() => {
              if (totalProduct < stock) {
                setTotalProduct(totalProduct + 1);
              }
            }}
            className="hover:bg-gray-200 px-2 rounded-lg"
          >
            +
          </button>
        </div>
        <div className="w-full">
          <button className="w-full bg-black px-10 text-white rounded-3xl py-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
