import React from "react";
import ProductCard from "../ProductCard";
import CommentCard from "@/components/comments/CommentCard";
import ButtonComponent from "@/components/globals/Button";

function ProductReview() {
  return (
    <div className="mt-16">
      <div className="border mb-4"></div>
      <div className="flex justify-between">
        <h1 className="font-bold">
          All Reviews <span className="font-thin text-sm">(145)</span>
        </h1>
        <button className="text-white bg-black py-1 rounded-2xl px-5 text-sm">
          Write Review
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-y-5">
        {[...Array(6)].map((_, i) => (
          <CommentCard customwWidth={"w-96"} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <ButtonComponent text="Load More Reviews" />
      </div>
    </div>
  );
}

export default ProductReview;
