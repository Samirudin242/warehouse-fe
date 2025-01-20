"use client";
import React, { useState } from "react";

type ProductPhotoProps = {
  id: string;
  product_id: string;
  imageUrl: string;
};

type ProductPhotosProps = {
  listPhoto: ProductPhotoProps[];
};

export default function ProductPhotos({ listPhoto }: ProductPhotosProps) {
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    listPhoto ? listPhoto[0]?.imageUrl : ""
  );

  return (
    <div className="flex gap-5">
      <div className="space-y-5">
        {listPhoto?.map((photo, i) => {
          return (
            <div
              key={i}
              className="bg-customGray overflow-hidden w-full rounded-xl cursor-pointer"
              onClick={() => setMainImageUrl(photo.imageUrl)}
            >
              <img
                width={108}
                src={photo.imageUrl}
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
