"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { RiAdminFill } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useAppContext } from "@/contexts/useContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export default function Navbar() {
  const router = useRouter();
  const { setLastUrl } = useAppContext();
  const currentUrl = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleUser, setRoleUser] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  // Check token existence and validity
  useEffect(() => {
    const token = Cookies.get("accessToken");
    console.log("Token:", token);
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("Decoded token:", decoded);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
          setRoleUser(decoded.role);
          setIdUser(decoded.sub);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleOnClickCart = () => {
    router.push("/cart/1");
  };

  const handlePageAdmin = () => {
    router.push(`/admin/${idUser}`);
  };

  const handleClickRegister = (type: string) => {
    setLastUrl(currentUrl);
    if (type === "register") router.push("/auth/signup");
    else router.push("/auth/signin");
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="w-full border-b bg-white">
      {/* Top Announcement Bar */}
      <div className="bg-black text-white flex px-6 py-2 text-sm">
        <div className="flex-1 text-center">
          <span>Sign up and get 20% off on your first order.</span>
          <button className="underline ml-2 ">
            <Link href="/">Sign Up Now</Link>
          </button>
        </div>
        <button>
          <IoIosClose className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Navbar */}
      <nav className="flex items-center text-center px-20 py-4">
        {/* Logo */}
        <div className="text-2xl text-black flex items-center content-center text-center w-full">
          <Link className="mr-20" href="/">
            <span className="font-extrabold">YAKUSHOP.CO</span>
          </Link>
          {/* Nav Links */}
          <ul className="hidden md:flex space-x-6 text-sm font-medium items-center m-0">
            <li>
              <Link href="/shop" className="p-1 hover:bg-gray-100 rounded">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/on-sale" className="p-1 hover:bg-gray-100 rounded">
                On Sale
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="p-1 hover:bg-gray-100 rounded"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/brands" className="p-1 hover:bg-gray-100 rounded">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4  w-full">
          {/* Search Input */}
          <div className="flex items-center border rounded-full w-full bg-slate-100">
            <CiSearch className="w-6 h-6 text-black ml-3 " />
            <input
              type="text"
              placeholder="Search for products..."
              className="hidden md:block w-64 rounded-full px-4 py-2 text-sm focus:outline-none text-black bg-slate-100"
            />
          </div>

          {/* Cart Icon */}
          <button
            onClick={handleOnClickCart}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <LuShoppingCart className="w-6 h-6 text-black" />
          </button>

          {/* User Icon */}
          <Dropdown
            overlay={
              <Menu>
                {isLoggedIn ? (
                  <>
                    <Menu.Item key="2">My Account</Menu.Item>
                    <Menu.Item key="1" onClick={handleLogout}>
                      Logout
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item
                      key="3"
                      onClick={() => handleClickRegister("login")}
                    >
                      Login
                    </Menu.Item>
                  </>
                )}
              </Menu>
            }
          >
            <button className="p-1 hover:bg-gray-100 rounded">
              <FaRegCircleUser className="w-6 h-6 text-black" />
            </button>
          </Dropdown>
          {(roleUser === "WAREHOUSE_ADMIN" || roleUser === "SUPER_ADMIN") && (
            <button
              onClick={handlePageAdmin}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <RiAdminFill className="w-6 h-6 text-black" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
