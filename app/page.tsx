"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { SkeletonLoader } from "@/components/skeletonLoading/SkeletonLoader";
import { useAppContext } from "@/contexts/useContext";

const ClientCarousel = dynamic(
  () => import("@/components/carousel/CarouselTemplate"),
  {
    loading: () => <SkeletonLoader type="carousel" />,
    ssr: false,
  }
);

const ClientListProduct = dynamic(
  () => import("@/components/products/ListProduct"),
  {
    loading: () => <SkeletonLoader type="product-list" />,
    ssr: false,
  }
);

const ClientCategoriesStyle = dynamic(
  () => import("@/components/categoriesStyle/CategoriesStyle"),
  {
    loading: () => <SkeletonLoader type="categories" />,
    ssr: false,
  }
);

const ClientComments = dynamic(() => import("@/components/comments/Comments"), {
  loading: () => <SkeletonLoader type="comments" />,
  ssr: false,
});

export default function Home() {
  const { setLoading } = useAppContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      <Suspense fallback={<SkeletonLoader type="carousel" />}>
        <ClientCarousel />
      </Suspense>

      <Suspense fallback={<SkeletonLoader type="product-list" />}>
        <ClientListProduct title="NEW ARRIVALS" type="new" />
      </Suspense>

      <Suspense fallback={<SkeletonLoader type="product-list" />}>
        <ClientListProduct
          isHideBorder={true}
          title="TOP SELLING"
          type="popular"
        />
      </Suspense>

      <Suspense fallback={<SkeletonLoader type="categories" />}>
        <ClientCategoriesStyle />
      </Suspense>

      <Suspense fallback={<SkeletonLoader type="comments" />}>
        <ClientComments />
      </Suspense>
    </div>
  );
}
