"use client";
import React, { useState } from "react";

export default function ProductPhotos() {
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638373219/flagship_sunrise/M0E20000000EFD3_0.jpg"
  );

  const [listUrlImage, setListImageUrl] = useState<string[]>([
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638373219/flagship_sunrise/M0E20000000EFD3_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638373221/flagship_sunrise/M0E20000000EFD3_1.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638373222/flagship_sunrise/M0E20000000EFD3_2.jpg",
  ]);

  return (
    <div className="flex gap-5">
      <div className="space-y-5">
        {listUrlImage.map((url, i) => {
          return (
            <div
              key={i}
              className="bg-customGray overflow-hidden w-full rounded-xl cursor-pointer"
              onClick={() => setMainImageUrl(url)}
            >
              <img
                width={108}
                src={url}
                className="object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          );
        })}
      </div>
      <div className="bg-customGray overflow-hidden w-full rounded-xl h-fit content-center flex justify-center">
        <img
          width={300}
          height={100}
          src={mainImageUrl}
          alt=""
          className="object-contain mix-blend-multiply transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
    </div>
  );
}
