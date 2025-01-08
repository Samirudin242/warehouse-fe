"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input } from "antd";
import { configUrl } from "@/config/configUrl";
import useSwr from "@/hooks/useSwr";
import AddUserModal from "@/components/admin/user/ModalAddUser";

const { Option } = Select;

const page = () => {
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModal, setIsAddModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);

  const { data, error, isLoading, refresh } = useSwr(
    `${configUrl.apiUrlUserService}/user`
  );

  const users = data?.content || [];
  const totalUsers = data?.totalElements || 0;

  const handleRoleFilterChange = (value: string | null) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <img
            src={record.profile_picture}
            alt="profile"
            className="w-10 h-10 rounded-full mr-2.5"
          />
          {text}
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="p-5">
      <div className="mb-5 flex justify-between">
        <div className="flex gap-2.5">
          <Select
            placeholder="Filter by Role"
            allowClear
            className="w-52"
            onChange={handleRoleFilterChange}
          >
            {/* Dynamically render roles if available */}
            {(data?.roles || []).map((role: string) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1 w-52"
          />
        </div>
        <Button
          onClick={() => setIsAddModal(true)}
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add New User
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: totalUsers,
          onChange: (page) => setCurrentPage(page),
        }}
        loading={isLoading}
        className="shadow-sm"
      />

      {isAddModal && (
        <AddUserModal
          isOpen={isAddModal}
          onCancel={() => setIsAddModal(false)}
          refresh={refresh}
        />
      )}

      {error && <div className="text-red-500">Failed to load data</div>}
    </div>
  );
};

export default page;
