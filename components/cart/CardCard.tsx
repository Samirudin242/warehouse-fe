import { formatToRupiah } from "@/app/utils/formatPrice";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "@/contexts/useContext";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import GlobalModal from "../modal/GlobalModal";
import Image from "next/image";

type CartProps = {
  id: string;
  name: string;
  size: string;
  sizeId: string;
  quantity: number;
  price: number;
  color: string;
  colorId: string;
  imageUrl: string;
  productId: string;
  stock: number;
  refresh: (url: string) => void;
};

function CardCard({
  id,
  name,
  size,
  sizeId,
  quantity,
  color,
  colorId,
  price,
  imageUrl,
  productId,
  stock,
  refresh,
}: CartProps) {
  const { user } = useAppContext();

  const userId = user?.id;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChangeQuantity = async (
    totalPrice: number,
    currentQuantity: number,
    isAdd: boolean
  ) => {
    const pricePerProduct = totalPrice / currentQuantity;
    const quantityProduct = isAdd ? currentQuantity + 1 : currentQuantity - 1;

    const body = {
      user_id: userId,
      product_id: productId,
      selected_color: colorId,
      selected_size: sizeId,
      quantity: quantityProduct,
      price: pricePerProduct * quantityProduct,
    };

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlProductService}/cart/${id}`,
      method: "PUT",
      body: body,
    });

    if (response) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
    }
  };

  const handleDeleteCart = async () => {
    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlProductService}/cart/${id}`,
      method: "DELETE",
    });
    if (response) {
      refresh(`${configUrl.apiUrlProductService}/cart/${userId}`);
      setOpenModal(false);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="bg-customGray overflow-hidden content-center rounded-lg">
          <Image
            className="h-32 w-36 aspect-[3/2] object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
            src={imageUrl}
            width={100}
            height={50}
            alt="product-image"
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
        <div
          onClick={() => setOpenModal(true)}
          className="self-end rounded-md px-1 hover:bg-red-100 cursor-pointer"
        >
          <MdDelete className="text-red-600 text-2xl" />
        </div>
        <div className="flex justify-between border py-2 gap-5 px-4 rounded-3xl bg-customGray">
          <button
            onClick={() => handleChangeQuantity(price, quantity, false)}
            className="hover:bg-gray-200 px-2 rounded-lg"
            disabled={quantity == 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleChangeQuantity(price, quantity, true)}
            className="hover:bg-gray-200 px-2 rounded-lg"
            disabled={stock == quantity}
          >
            +
          </button>
        </div>
      </div>
      <GlobalModal
        isVisible={openModal}
        icon="cart"
        onCancel={() => setOpenModal(false)}
        title={`Delete cart item ${name}`}
        content={`Are you sure delete cart item ${name}`}
        onOk={handleDeleteCart}
      />
    </div>
  );
}

export default CardCard;
