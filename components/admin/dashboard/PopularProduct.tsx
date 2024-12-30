"use client";

import React from "react";

type Product = {
  name: string;
  photo: string;
  totalProfit: number;
};

const products: Product[] = [
  {
    name: "Laptop",
    photo: "https://via.placeholder.com/150?text=Laptop",
    totalProfit: 5000,
  },
  {
    name: "Smartphone",
    photo: "https://via.placeholder.com/150?text=Smartphone",
    totalProfit: 3000,
  },
  {
    name: "Headphones",
    photo: "https://via.placeholder.com/150?text=Headphones",
    totalProfit: 1500,
  },
  {
    name: "Smartwatch",
    photo: "https://via.placeholder.com/150?text=Smartwatch",
    totalProfit: 1200,
  },
  {
    name: "Camera",
    photo: "https://via.placeholder.com/150?text=Camera",
    totalProfit: 7000,
  },
];

const PopularProductsList = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Popular Products</h1>
      <ul className="space-y-4">
        {products.map((product, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-2 border rounded-md shadow-md bg-white"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500">
                Total Profit: ${product.totalProfit}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularProductsList;
