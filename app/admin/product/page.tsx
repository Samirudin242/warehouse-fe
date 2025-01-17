"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Select } from "antd";
import type { ColumnType, ColumnGroupType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { createStyles } from "antd-style";
import _startCase from "lodash/startCase";
import _toLower from "lodash/toLower";
import ModalAddProduct from "../../../components/admin/product/ModalAddProduct";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

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
  imageUrl: string;
};

const categories = ["All", "Electronics", "Clothing", "Groceries", "Toys"];

const Page = () => {
  const { styles } = useStyle();

  const { data, error, isLoading, refresh } = useHookSwr(
    `${configUrl.apiUrlProductService}/product`
  );

  const products = data?.content || [];

  const totalProduct = data?.totalElements || 0;

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isAddProduct, setIsAddProduct] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

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

  const columns: (ColumnType<Product> | ColumnGroupType<Product>)[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (_: any, product: Product) => (
        <div className="flex items-center space-x-4">
          <img
            src={product?.imageUrl}
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
      render: (price: number) => `Rp. ${price}`,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand: any) => <div>{brand?.name}</div>,
    },
    {
      title: "Category",
      dataIndex: "productCategory",
      key: "productCategory",
      render: (category: any) => (
        <div>{_startCase(_toLower(category?.name))}</div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions", // Add a placeholder `dataIndex` for consistency
      fixed: "right",
      render: (_: any, product: Product) => (
        <Dropdown overlay={menu(product.sku)} trigger={["click"]}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];

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

      {/* Product Table */}
      <Table
        columns={columns}
        dataSource={products}
        pagination={{
          current: currentPage,
          pageSize,
          total: totalProduct,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="key"
        className={styles.customTable}
      />

      {isAddProduct && (
        <ModalAddProduct
          refresh={refresh}
          isOpen={isAddProduct}
          onCancel={() => setIsAddProduct(false)}
        />
      )}
    </div>
  );
};

export default Page;
