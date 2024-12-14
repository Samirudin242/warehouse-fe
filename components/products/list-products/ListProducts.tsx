import React from "react";
import ProductCard from "../ProductCard";

function ListProducts() {
  const url = [
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638374505/flagship_sunrise/M0E20000000EHIZ_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638371728/flagship_sunrise/M0E20000000EL27_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
  ];
  return (
    <div>
      <div>Casual</div>
      <div className="flex">
        {url.map((u, i) => {
          return (
            <div key={i}>
              <ProductCard
                imageSrc={u}
                title="Baju kaos"
                rating={4}
                reviews={4}
                price={1000}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListProducts;
