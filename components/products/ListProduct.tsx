import React from "react";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  isHideBorder?: Boolean;
}

function ListProduct({ title, isHideBorder }: Props) {
  return (
    <div className="mt-14 px-28">
      <h1 className="text-4xl font-extrabold text-black text-center mb-10">
        {title}
      </h1>
      <div className="flex justify-between">
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638376445/flagship_sunrise/M0E20000000DTVF_0.jpg"
          price={1000}
          rating={4}
        />
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638374296/flagship_sunrise/M0E20000000DU7X_0.jpg"
          price={1000}
          rating={4}
        />
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638374942/flagship_sunrise/M0E20000000DU7G_0.jpg"
          price={1000}
          rating={4}
        />
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638371385/flagship_sunrise/M0E20000000DTSX_1.jpg"
          price={1000}
          rating={4}
        />
      </div>
      <div className="text-center mb-10 mt-10">
        <button className="border py-2 px-10 rounded-2xl">View All</button>
      </div>
      {!isHideBorder && <div className="border w-full"></div>}
    </div>
  );
}

export default ListProduct;
