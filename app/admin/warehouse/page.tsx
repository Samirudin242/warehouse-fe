"use client";

import React, { useState } from "react";

import { Table, Dropdown, Menu, Button, Select, Input } from "antd";
import { ColumnType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import ModalAddWarehouse from "@/components/admin/warehouse/ModalAddWarehouse";
import SkeletonTable from "@/components/skeletonLoading/TableSkeleton";

export default function AdminWarehousePage() {
  const { data, error, isLoading, refresh } = useSwr(
    `${configUrl.apiUrlWarehouseService}/warehouse`
  );

  const warehouses = data?.content || [];

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleEditClick = (key: string) => {
    console.log(`Edit warehouse with key: ${key}`);
  };

  const handleDeleteClick = (key: string) => {
    console.log(`Delete warehouse with key: ${key}`);
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

  const columns: Array<
    ColumnType<{
      key: string;
      name: string;
      location: string;
      capacity: number;
      status: string;
    }>
  > = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      fixed: "right",
      title: "Actions",
      key: "actions",
      render: (_: any, product: any) => (
        <Dropdown overlay={menu(product.sku)} trigger={["click"]}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-5 flex justify-between">
        <div className="flex gap-2.5">
          <Select
            placeholder="Filter by Role"
            allowClear
            className="w-52"
            // onChange={handleRoleFilterChange}
          >
            {/* Dynamically render roles if available */}
            {/* {(data?.roles || []).map((role: string) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))} */}
          </Select>
          <Input
            placeholder="Search by Name"
            // value={searchTerm}
            // onChange={handleSearchChange}
            className="border rounded px-2 py-1 w-52"
          />
        </div>
        <Button
          onClick={() => setIsOpenModal(true)}
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add New Warehouse
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={warehouses}
        pagination={{ pageSize: 5 }}
        className="shadow-md bg-white rounded-md"
      />
      {isOpenModal && (
        <ModalAddWarehouse
          isOpen={isOpenModal}
          refresh={refresh}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
}
