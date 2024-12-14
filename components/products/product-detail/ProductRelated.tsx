import React from "react";
import ProductCard from "../ProductCard";

function ProductRelated() {
  const url = [
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638372371/flagship_sunrise/M0E20000000EFE9_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638372372/flagship_sunrise/M0E20000000EFE9_1.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638372373/flagship_sunrise/M0E20000000EFE9_2.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638371600/flagship_sunrise/M0E20000000DUV0_0.jpg",
  ];
  return (
    <div className="mt-10">
      <h1 className="mb-10 text-center text-3xl font-bold">
        YOU MIGHT ALSO LIKE{" "}
      </h1>
      <div className="flex justify-between">
        {url.map((card, i) => {
          return (
            <div key={i}>
              <ProductCard
                imageSrc={card}
                title="T-Shirt Kaos multi"
                rating={4}
                price={200}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductRelated;
