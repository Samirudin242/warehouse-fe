"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input } from "antd";
import { configUrl } from "@/config/configUrl";
import { City, Role } from "@/types/city";
import axiosRequest from "@/hooks/useAxios";
import AddUserModal from "@/components/admin/user/ModalAddUser";

const { Option } = Select;

const page = () => {
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [listRoles, setListRoles] = useState<Role[]>([]);

  const [isAddModal, setIsAddModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const { response } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/auth/get-roles`,
      });
      console.log("response", response?.data);
      setListRoles(response?.data);
    };

    fetchRoles();
  }, []);

  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      role: "Admin",
      address: "123 Main St, Cityville",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      role: "User",
      address: "456 Elm St, Townsville",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Mike Johnson",
      username: "mikej",
      role: "Moderator",
      address: "789 Oak St, Villagetown",
      profilePic: "https://via.placeholder.com/50",
    },
  ];

  const roles = ["Admin", "User", "Moderator"];

  const handleRoleFilterChange = (value: string | null) => {
    setRoleFilter(value);
  };

  const filteredUsers = users.filter(
    (user) =>
      (!roleFilter || user.role === roleFilter) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <img
            src={record.profilePic}
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
      dataIndex: "role",
      key: "role",
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
            {roles.map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="shadow-sm"
      />

      {isAddModal && (
        <AddUserModal
          isOpen={isAddModal}
          onCancel={() => setIsAddModal(false)}
          roles={listRoles}
        />
      )}
    </div>
  );
};

export default page;
