import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { parseCookies } from "nookies";

import ProductCard from "../ProductCard";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  totalSell: number;
  rating: number;
  imageUrl: string;
};

function ProductRelated() {
  const pathName = usePathname();

  const cookies = parseCookies();
  const productId = cookies.productId;

  const segments = pathName.split("/");
  const encodedProductName = segments.pop();
  const productName = encodedProductName
    ? decodeURIComponent(encodedProductName)
    : "";

  const shortName = productName ? productName.substring(0, 5) : "";

  const [productData, setProductData] = useState<Product[]>([]);

  const { data, refresh } = useHookSwr(
    shortName
      ? `${
          configUrl.apiUrlProductService
        }/product-public?size=${10}&name=${shortName}`
      : null
  );

  useEffect(() => {
    refresh(
      `${
        configUrl.apiUrlProductService
      }/product-public?size=${10}&name=${shortName}`
    );
  }, [shortName]);

  useEffect(() => {
    const datas = data?.content;
    let filterData = datas?.filter((d: any) => d.id != productId);
    if (filterData?.length > 4) {
      filterData = filterData?.slice(0, 4);
    }
    setProductData(filterData);
  }, [data]);

  return (
    <div className="mt-10">
      <h1 className="mb-10 text-center text-3xl font-bold">
        YOU MIGHT ALSO LIKE{" "}
      </h1>
      <div className="flex justify-between">
        {productData?.map((product: Product, i: number) => {
          return (
            <div key={i}>
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
    </div>
  );
}

export default ProductRelated;
