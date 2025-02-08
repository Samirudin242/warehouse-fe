"use client";
import React, { useEffect, useRef } from "react";
import CommentCard from "./CommentCard";
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

function Comments() {
  const { data, isLoading } = useHookSwr(
    `${
      configUrl.apiUrlProductService
    }/product-public/reviews?&size=10&rating=${5}`
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const scrollInterval = setInterval(() => {
        if (
          Math.ceil(scrollContainer.scrollLeft + scrollContainer.offsetWidth) >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0 });
        } else {
          scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
        }
      }, 10);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-extrabold text-black px-20">
        OUR HAPPY CUSTOMERS
      </h1>
      <div
        ref={scrollRef}
        className="relative overflow-x-auto scrollbar-hide px-20"
      >
        <div className="flex space-x-16">
          {data?.content?.map((review: Comment) => {
            return (
              <CommentCard
                className="w-80"
                key={review.id}
                comment={review.comment}
                rating={review.rating}
                date={review.createdAt}
                name={review?.customerName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comments;
