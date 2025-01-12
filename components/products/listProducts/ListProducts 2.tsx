"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCard";
import Pagination from "@/components/globals/Pagination";

function ListProducts() {
  const url = [
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638374505/flagship_sunrise/M0E20000000EHIZ_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638371728/flagship_sunrise/M0E20000000EL27_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
    "https://res.cloudinary.com/hilnmyskv/image/upload/v1638376213/flagship_sunrise/M0E20000000EL43_0.jpg",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  return (
    <div className="text-black w-full">
      <div className="mb-4 text-xl font-bold">Casual</div>
      <div className="grid grid-cols-3 gap-y-3 w-full">
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
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default ListProducts;
