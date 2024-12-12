import React from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function CommentCard() {
  return (
    <div>
      <div className="border w-72 rounded-lg py-4 px-3">
        <div className="flex">
          {[...Array(4)].map((_, i) => (
            <IoStarSharp key={i} className="text-amber-300" />
          ))}
        </div>
        <div className="flex mt-2">
          <h1 className="font-bold text-black">Sarah M. </h1>
          <span className="ml-3">
            <FaCheckCircle className="text-green-600" />
          </span>{" "}
        </div>
        <div>
          <p className="font-thin text-black">
            "I'm blown away by the quality and style of the clothes I received
            from Shop.co. From casual wear to elegant dresses, every piece I've
            bought has exceeded my expectations.”
          </p>
        </div>
      </div>
    </div>
  );
}
