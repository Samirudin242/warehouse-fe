"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { createStyles } from "antd-style";
import ModalAddProduct from "./ModalAddProduct";

const { Option } = Select;

const useStyle = createStyles(({ css, token }) => {
  const antCls = ".ant";
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

type Product = {
  key: React.Key;
  name: string;
  sku: string;
  stock: number;
  price: number;
  warehouse: string;
  brand: string;
  color: string;
  size: string;
  category: string;
  photo: string;
};

const products: Product[] = [
  {
    key: "1",
    name: "Product 1",
    sku: "P001",
    stock: 30,
    price: 15.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "2",
    name: "Product 2",
    sku: "P002",
    stock: 50,
    price: 25.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "3",
    name: "Product 3",
    sku: "P003",
    stock: 10,
    price: 9.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Groceries",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "4",
    name: "Product 4",
    sku: "P004",
    stock: 20,
    price: 5.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Toys",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "5",
    name: "Product 5",
    sku: "P005",
    stock: 5,
    price: 19.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "6",
    name: "Product 6",
    sku: "P006",
    stock: 100,
    price: 12.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
];

const categories = ["All", "Electronics", "Clothing", "Groceries", "Toys"];

const ProductList = () => {
  const { styles } = useStyle();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [isAddProduct, setIsAddProduct] = useState(false);

  const handleEditClick = (sku: string) => {
    console.log(`Edit product with SKU: ${sku}`);
  };

  const handleDeleteClick = (sku: string) => {
    console.log(`Delete product with SKU: ${sku}`);
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

  const columns = [
    {
      fixed: "left",
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (_: any, product: Product) => (
        <div className="flex items-center space-x-4">
          <img
            src={product.photo}
            alt={product.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse",
      key: "warehouse",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      fixed: "right",
      title: "Actions",
      key: "actions",
      render: (_: any, product: Product) => (
        <Dropdown overlay={menu(product.sku)} trigger={["click"]}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-semibold mb-4">Product List</h1>

      {/* Filter UI */}
      <div className="mb-3">Filter Product</div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Select
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
            className="w-44"
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Button onClick={() => setIsAddProduct(true)}>Add Product</Button>
        </div>
      </div>

      {/* Add Product Button */}

      {/* Product Table */}
      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        className={styles.customTable}
      />

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
