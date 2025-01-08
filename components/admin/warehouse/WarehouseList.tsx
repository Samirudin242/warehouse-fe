"use client";

import React from "react";
import { Table, Button } from "antd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const warehouses = [
  {
    key: "1",
    name: "Main Warehouse",
    location: "Jakarta",
    capacity: 1000,
    status: "Active",
  },
  {
    key: "2",
    name: "Secondary Warehouse",
    location: "Bandung",
    capacity: 500,
    status: "Inactive",
  },
  {
    key: "3",
    name: "Remote Warehouse",
    location: "Surabaya",
    capacity: 700,
    status: "Active",
  },
];

export default function WarehouseList() {
  const handleEditClick = (key: string) => {
    console.log(`Edit warehouse with key: ${key}`);
  };

  const handleDeleteClick = (key: string) => {
    console.log(`Delete warehouse with key: ${key}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a: any, b: any) => a.location.localeCompare(b.location),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      sorter: (a: any, b: any) => a.capacity - b.capacity,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            type="text"
            icon={<FaEdit />}
            onClick={() => handleEditClick(record.key)}
          />
          <Button
            type="text"
            icon={<FaTrashAlt />}
            danger
            onClick={() => handleDeleteClick(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Warehouse List</h1>
      <Table
        columns={columns}
        dataSource={warehouses}
        pagination={{ pageSize: 5 }}
        className="shadow-md bg-white rounded-md"
      />
    </div>
  );
}
