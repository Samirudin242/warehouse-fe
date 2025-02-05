"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Menu, MenuProps } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";

import { useAppContext } from "@/contexts/useContext";

export default function TopBarAdmin() {
  const { setLoading, user } = useAppContext();

  const router = useRouter();

  const handlePageProfileUser = () => {
    setLoading(true);
    router.push(`/user/${user.user_name}`);
  };

  const accountMenuItems: MenuProps["items"] = [
    { key: "1", label: "My Account" },
  ];

  return (
    <div className="flex items-center justify-between bg-gray-200 py-2.5 px-6 shadow-md  w-full overflow-hidden">
      <div className="flex items-center border rounded-full bg-gray-100 w-full max-w-lg overflow-hidden">
        <CiSearch className="w-5 h-5 text-gray-500 ml-3" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full rounded-full px-4 py-2 text-sm focus:outline-none text-gray-800 bg-gray-100"
        />
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <Dropdown
          overlay={
            <Menu items={accountMenuItems} onClick={handlePageProfileUser} />
          }
          placement="bottomRight"
        >
          <button className="p-2 hover:bg-gray-300 rounded-full">
            <FaRegCircleUser className="w-5 h-5 text-gray-700" />
          </button>
        </Dropdown>

        <button
          onClick={() => router.push("/")}
          className="p-2 hover:bg-gray-300 rounded-full"
        >
          <BsShop className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
