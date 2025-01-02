"use client";

import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ModalAddProduct from "./ModalAddProduct";

type Product = {
  name: string;
  sku: string;
  stock: number;
  price: number;
  category: string;
  photo: string;
};

const products: Product[] = [
  {
    name: "Product 1",
    sku: "P001",
    stock: 30,
    price: 15.99,
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    name: "Product 2",
    sku: "P002",
    stock: 50,
    price: 25.99,
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
  {
    name: "Product 3",
    sku: "P003",
    stock: 10,
    price: 9.99,
    category: "Groceries",
    photo: "https://via.placeholder.com/50",
  },
  {
    name: "Product 4",
    sku: "P004",
    stock: 20,
    price: 5.99,
    category: "Toys",
    photo: "https://via.placeholder.com/50",
  },
  {
    name: "Product 5",
    sku: "P005",
    stock: 5,
    price: 19.99,
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    name: "Product 6",
    sku: "P006",
    stock: 100,
    price: 12.99,
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
];

const categories = ["All", "Electronics", "Clothing", "Groceries", "Toys"];

const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);

  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);

  // Filter products based on category and price range
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const handleEditClick = (sku: string) => {
    console.log(`Edit product with SKU: ${sku}`);
    // Implement edit functionality here
  };

  const handleDeleteClick = (sku: string) => {
    console.log(`Delete product with SKU: ${sku}`);
    // Implement delete functionality here
  };

  const menu = (sku: string) => (
    <Menu>
      <Menu.Item onClick={() => handleEditClick(sku)} icon={<FaEdit />}>
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() => handleDeleteClick(sku)}
        danger
        icon={<FaTrashAlt />}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-semibold mb-4">Product List</h1>

      {/* Filter UI */}
      <div className="flex items-center space-x-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="p-2 border rounded-md shadow-sm focus:outline-none"
            placeholder="Min Price"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="p-2 border rounded-md shadow-sm focus:outline-none"
            placeholder="Max Price"
          />
        </div>
      </div>

      {/* Add Product Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          onClick={() => setIsAddProduct(true)}
        >
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No products found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center space-x-4">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="px-4 py-2">{product.sku}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2 text-center">
                  <Dropdown overlay={menu(product.sku)} trigger={["click"]}>
                    <button className="text-gray-500 hover:text-gray-700">
                      <span className="text-2xl">•••</span>
                    </button>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isAddProduct && (
        <ModalAddProduct
          isOpen={isAddProduct}
          onCancel={() => setIsAddProduct(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
