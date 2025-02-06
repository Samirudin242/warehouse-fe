"use client";
import React, { useEffect } from "react";

import { useParams } from "next/navigation";
import { parseCookies } from "nookies";

import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import ProductDetailDescription from "@/components/products/product-detail/ProductDetailDescription";
import ProductPhotos from "@/components/products/product-detail/ProductPhotos";
import ProductRelated from "@/components/products/product-detail/ProductRelated";
import ProductReview from "@/components/products/product-detail/ProductReview";
import ProductDetailSkeleton from "@/components/skeletonLoading/ProductDetailSkeleton";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import { useAppContext } from "@/contexts/useContext";

function ProductDetail() {
  const { setLoading, setLoadingAnimation } = useAppContext();
  const cookies = parseCookies();
  const productId = cookies.productId;

  const { data, isLoading, refresh } = useHookSwr(
    productId
      ? `${configUrl.apiUrlProductService}/product-public/${productId}`
      : null
  );

  useEffect(() => {
    setLoading(false);
    setLoadingAnimation(false);
    if (productId) {
      refresh(`${configUrl.apiUrlProductService}/product-public/${productId}`);
    }
  }, [productId]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  console.log(data);
  return (
    <div className="px-20 text-black">
      <Breadcrumbs isHideLast={true} />
      {/* <ProductDetailSkeleton /> */}
      <div>
        <div className="flex gap-5">
          <div className="flex-1">
            <ProductPhotos listPhoto={data?.listImages} />
          </div>
          <div className="flex-1">
            <ProductDetailDescription
              id={data?.id}
              name={data?.name}
              description={data?.description}
              price={data?.productPrice}
              colors={data?.productAndColors}
              sizes={data?.productAndSizes}
              rating={data?.rating}
              stock={data?.stock}
            />
          </div>
        </div>
        <div>
          <ProductReview />
        </div>
        <div>
          <ProductRelated />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
