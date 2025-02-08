"use client";

import React, { useState } from "react";
import CommentCard from "@/components/comments/CommentCard";
import ButtonComponent from "@/components/globals/Button";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

type Comment = {
  id: string;
  comment: string;
  rating: number;
  date: string;
  className?: string;
  createdAt: string;
  profileUrl: string;
  customerName: string;
};

type ReviewProps = {
  productId: string;
};

function ProductReview({ productId }: ReviewProps) {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useHookSwr(
    `${configUrl.apiUrlProductService}/product-public/reviews?productId=${productId}&size=6&page=${page}`
  );

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <section className="mt-16">
      <hr className="mb-6 border-t-2" />

      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          Customer Reviews
          <span className="ml-2 text-gray-500 font-normal">
            ({data?.totalElements ?? 0})
          </span>
        </h2>
      </header>

      {isLoading ? (
        <div>Loading reviews...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.content?.map((review: Comment) => (
              <CommentCard
                key={review.id}
                comment={review.comment}
                rating={review.rating}
                date={review.createdAt}
                className="w-full"
                name={review?.customerName}
              />
            ))}
          </div>

          {!data?.last && (
            <div className="flex justify-center mt-10">
              <ButtonComponent
                text="Load More Reviews"
                onClick={handleLoadMore}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ProductReview;
