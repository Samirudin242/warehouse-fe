"use client";

import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import ProductDetailDescription from "@/components/products/product-detail/ProductDetailDescription";
import ProductPhotos from "@/components/products/product-detail/ProductPhotos";
import ProductRelated from "@/components/products/product-detail/ProductRelated";
import ProductReview from "@/components/products/product-detail/ProductReview";
import ProductDetailSkeleton from "@/components/skeletonLoading/ProductDetailSkeleton";
import useHookSwr from "@/hooks/useSwr";
import React from "react";
import { configUrl } from "@/config/configUrl";

function page() {
  const { id } = useParams();

  console.log(id);

  const { data, isLoading, refresh } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/${id}`
  );

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

export default page;
