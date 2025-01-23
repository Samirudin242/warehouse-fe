"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa6";
import { formatToRupiah } from "@/app/utils/formatPrice";
import { useAppContext } from "@/contexts/useContext";
import { DescriptionProps } from "@/types/ProductDescription";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";

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
  const { user } = useAppContext();
  const token = Cookies.get("accessToken");

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [totalProduct, setTotalProduct] = useState<number>(1);

  const handleSelectColor = (id: string) => {
    setSelectedColor(id);
  };

  const handleSelectSize = (id: string) => {
    setSelectedSize(id);
  };

  const handleAddProductToCart = async () => {
    if (!user || !token) {
      router.push("/auth/signin");
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Select both a product size and color to continue", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      return;
    }
    const body = {
      user_id: user.id,
      product_id: id,
      selected_color: selectedColor,
      selected_size: selectedSize,
      quantity: totalProduct,
      price: price.price,
    };

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlProductService}/cart`,
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      toast.success("Succesfully add product to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }

    console.log(body);
  };

  return (
    <div>
      <ToastContainer />
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
                selectedColor == color.color_id ? "ring-2 ring-black" : ""
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
              onClick={() => handleSelectColor(color.color_id)}
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
                selectedSize.includes(size.size_id)
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectSize(size.size_id)}
            >
              {size?.size}
            </button>
          ))}
        </div>
      </div>
      <div className="border mt-3"></div>
      <div className="mt-3 flex w-full gap-5 content-center items-center">
        <div className="w-44">Stock total: {stock}</div>
        <div className="px-5 flex content-center justify-center align-middle border gap-16 rounded-3xl py-2 bg-customGray w-full">
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
          <button
            onClick={handleAddProductToCart}
            className=" w-full bg-black px-10 text-white rounded-3xl py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
