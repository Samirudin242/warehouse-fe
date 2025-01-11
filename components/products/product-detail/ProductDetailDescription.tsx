"use client";
import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";

export default function ProductDetailDescription() {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <div>
      <h1 className="text-2xl font-bold">One Life Graphic T-shirt</h1>
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <IoStarSharp key={i} className="text-amber-300 text-xl" />
        ))}
        <span className="text-base text-gray-500 ml-2">4/5</span>
      </div>
      <div className="flex gap-4">
        <h1 className="text-xl font-bold">$260</h1>
        <h1 className="text-xl font-bold text-gray-300 line-through	">$300</h1>
        <h1 className="border px-2 rounded-xl bg-red-100 text-red-500">-40%</h1>
      </div>
      <div className="mt-2">
        <p className="font-thin">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3">
        <h3 className="font-thin text-sm">Select Colors</h3>
        <div className="flex gap-3 mt-2">
          <div className="w-10 flex justify-center items-center rounded-3xl h-9 bg-red-300 cursor-pointer">
            <IoIosCheckmark className="text-white text-2xl" />
          </div>
          <div className="w-10 flex justify-center items-center rounded-3xl h-9 bg-blue-300 cursor-pointer">
            <IoIosCheckmark className="text-white text-2xl" />
          </div>
          <div className="w-10 flex justify-center items-center rounded-3xl h-9 bg-yellow-300 cursor-pointer">
            <IoIosCheckmark className="text-white text-2xl" />
          </div>
        </div>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3">
        <h3 className="font-thin text-sm">Choose Size</h3>
        <div className="flex gap-3 mt-2">
          <button
            className={`${
              selectedSize == "small"
                ? "bg-black text-white"
                : "bg-customGray text-black"
            } rounded-3xl font-thin px-5 py-2`}
            onClick={() => setSelectedSize("small")}
          >
            Small
          </button>
          <button
            className={`${
              selectedSize == "medium"
                ? "bg-black text-white"
                : "bg-customGray text-black"
            } rounded-3xl font-thin px-5 py-2`}
            onClick={() => setSelectedSize("medium")}
          >
            Medium
          </button>
          <button
            className={`${
              selectedSize == "large"
                ? "bg-black text-white"
                : "bg-customGray text-black"
            } rounded-3xl font-thin px-5 py-2`}
            onClick={() => setSelectedSize("large")}
          >
            Large
          </button>
          <button
            className={`${
              selectedSize == "x-large"
                ? "bg-black text-white"
                : "bg-customGray text-black"
            } rounded-3xl font-thin px-5 py-2`}
            onClick={() => setSelectedSize("x-large")}
          >
            X-Large
          </button>
        </div>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3 flex w-full gap-5">
        <div className="px-5 flex border gap-16 rounded-3xl py-2 bg-customGray">
          <button className="hover:bg-gray-200 px-2 rounded-lg">-</button>
          <div>1</div>
          <button className="hover:bg-gray-200 px-2 rounded-lg">+</button>
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
