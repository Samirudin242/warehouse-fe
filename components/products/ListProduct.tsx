import React from "react";
import { useRouter } from "next/navigation";

import ProductCard from "./ProductCard";
import ButtonComponent from "../globals/Button";
import { configUrl } from "@/config/configUrl";

import useHookSwr from "@/hooks/useSwr";
import { useAppContext } from "@/contexts/useContext";
interface Props {
  title: string;
  isHideBorder?: Boolean;
  page: number;
}

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  totalSell: number;
  rating: number;
  imageUrl: string;
};

function ListProduct({ title, isHideBorder, page }: Props) {
  const { setLoading } = useAppContext();
  const router = useRouter();

  const { data, error, isLoading, refresh } = useHookSwr(
    `${configUrl.apiUrlProductService}/product-public?size=${4}&page=${page}`
  );

  const product = data?.content || [];

  return (
    <div className="mt-14 px-28">
      <h1 className="text-4xl font-extrabold text-black text-center mb-10">
        {title}
      </h1>
      <div className="flex justify-between">
        {product?.map((product: Product, i: number) => {
          return (
            <div
              key={i}
              onClick={() => {
                setLoading(true);
              }}
            >
              <ProductCard
                imageSrc={product.imageUrl}
                title={product.name}
                rating={product.rating}
                price={product.price}
                id={product.id}
                totalSell={product?.totalSell}
              />
            </div>
          );
        })}
      </div>
      <div className="text-center mb-10 mt-10">
        <ButtonComponent
          text="View All"
          onClick={() => {
            router.push("product/list-product/all");
          }}
        />
      </div>
      {!isHideBorder && <div className="border w-full"></div>}
    </div>
  );
}

export default ListProduct;
