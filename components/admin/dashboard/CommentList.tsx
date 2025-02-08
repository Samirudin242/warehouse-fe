"use client";

import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import moment from "moment";
import React from "react";

type Comment = {
  text: string;
  userName: string;
  date: string;
};

const comments: Comment[] = [
  {
    text: "This product is amazing! It exceeded all my expectations. Highly recommend!",
    userName: "Jane Doe",
    date: "2024-12-25 14:35",
  },
  {
    text: "Good quality, but the shipping was a bit slow. Overall, I'm happy with the purchase.",
    userName: "John Smith",
    date: "2024-12-24 10:12",
  },
  {
    text: "Not what I expected. The product description was misleading.",
    userName: "Alice Johnson",
    date: "2024-12-22 18:47",
  },
  {
    text: "Fantastic customer service! They resolved my issue quickly and professionally.",
    userName: "Chris Lee",
    date: "2024-12-21 16:08",
  },
  {
    text: "I love it! Great value for the price. Will buy again!",
    userName: "Emily Davis",
    date: "2024-12-20 11:02",
  },
];

const CommentList = () => {
  const { data, isLoading } = useHookSwr(
    `${
      configUrl.apiUrlProductService
    }/product-public/reviews?&size=10&rating=${5}`,
    {
      refreshInterval: 10000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const comments = data?.content;
  return (
    <div className="p-4 rounded-md shadow-md bg-white mt-3">
      <h1 className="text-xl font-semibold mb-4">Best Comments</h1>
      <div className="max-h-80 overflow-y-auto">
        <ul className="space-y-4">
          {comments?.map((comment: any, index: number) => (
            <li
              key={index}
              className="flex flex-col space-y-2 p-4 border rounded-md shadow-md bg-white"
            >
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{comment?.customerName}</span>
                <span className="text-sm text-gray-500">
                  {moment(comment?.createdAt).format("ll")}
                </span>
              </div>
              <p className="text-gray-700">{comment?.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentList;
