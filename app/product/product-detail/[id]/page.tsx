import Breadcrumbs from "@/components/bredcrumbs/Bredcrumbs";
import ProductDetailDescription from "@/components/products/product-detail/ProductDetailDescription";
import ProductPhotos from "@/components/products/product-detail/ProductPhotos";
import ProductRelated from "@/components/products/product-detail/ProductRelated";
import ProductReview from "@/components/products/product-detail/ProductReview";
import React from "react";

function ProductDetail() {
  return (
    <div className="px-20">
      <Breadcrumbs isHideLast={true} />
      <div>
        <div className="flex gap-5">
          <div className="flex-1">
            <ProductPhotos />
          </div>
          <div className="flex-1">
            <ProductDetailDescription />
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
