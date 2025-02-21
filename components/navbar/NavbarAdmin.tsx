"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartBar,
  FaBars,
  FaShippingFast,
} from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { useAppContext } from "@/contexts/useContext";

type NavbarAdminProps = {
  isMinimized: boolean;
  toggleSidebar: () => void;
};

const NavbarAdmin: React.FC<NavbarAdminProps> = ({
  isMinimized,
  toggleSidebar,
}) => {
  const { setLoading } = useAppContext();

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/admin/1", icon: <FaHome className="text-xl" /> },
    {
      name: "Order",
      path: "/admin/order",
      icon: <FaShippingFast className="text-xl" />,
    },
    {
      name: "Product",
      path: "/admin/product",
      icon: <FaBox className="text-xl" />,
    },
    {
      name: "Warehouse Admin",
      path: "/admin/user",
      icon: <FaUsers className="text-xl" />,
    },
    {
      name: "Warehouse",
      path: "/admin/warehouse",
      icon: <MdWarehouse className="text-xl" />,
    },

    {
      name: "Report",
      path: "/admin/report",
      icon: <FaChartBar className="text-xl" />,
    },
  ];

  return (
    <div
      className={`text-black h-screen bg-gray-100 flex flex-col ${
        isMinimized ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="py-4 px-4 bg-gray-200 flex items-center justify-between">
        {!isMinimized && <h1 className="text-lg font-bold">THEYAKU ADMIN</h1>}
        <button
          onClick={toggleSidebar}
          className="text-xl focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => {
                  if (pathname !== item.path) {
                    router.push(item.path);
                    setLoading(true);
                  }
                }}
                className={`w-full flex items-center px-4 py-2 hover:bg-gray-300 transition ${
                  pathname === item.path ? "bg-gray-700 text-white" : ""
                }`}
              >
                {item.icon}
                {!isMinimized && <span className="ml-4">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="py-4 px-4 bg-gray-200 text-center text-sm">
        {!isMinimized && <span>&copy; 2024 My Company</span>}
      </div>
    </div>
  );
};

export default NavbarAdmin;
