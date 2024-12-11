import React from "react";
import ProductCard from "./ProductCard";

function ListProduct() {
  return (
    <div className="mt-14 px-20">
      <h1 className="text-3xl font-extrabold text-black text-center mb-10">
        NEW ARRIVALS
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
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638376445/flagship_sunrise/M0E20000000DTVF_0.jpg"
          price={1000}
          rating={4}
        />
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638376445/flagship_sunrise/M0E20000000DTVF_0.jpg"
          price={1000}
          rating={4}
        />
        <ProductCard
          title="Down jacket ”Arsenal” Moncler brown"
          imageSrc="https://res.cloudinary.com/hilnmyskv/image/upload/v1638376445/flagship_sunrise/M0E20000000DTVF_0.jpg"
          price={1000}
          rating={4}
        />
      </div>
    </div>
  );
}

export default ListProduct;
