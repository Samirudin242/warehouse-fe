"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Dropdown, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";

import { RiAdminFill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { toast, Bounce, ToastContainer } from "react-toastify";

import { useAppContext } from "@/contexts/useContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CardIcon from "./CardIcon";
import OrderIcon from "./OrderIcon";
import SearchInput from "./SearchInput";

interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export default function Navbar() {
  const { setLoading } = useAppContext();

  const router = useRouter();
  const token = Cookies.get("accessToken");

  const { setLastUrl, setUser } = useAppContext();
  const currentUrl = usePathname();
  console.log(currentUrl, "<<");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleUser, setRoleUser] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isHideMenu, setIsHideMenu] = useState<boolean>(false);

  const [showBanner, setShowBaner] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("Decoded token:", decoded);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
          setRoleUser(decoded.role);
          setIdUser(decoded.sub);
          setUser({
            id: decoded.sub,
            role: decoded.role,
            user_name: decoded?.username,
          });
          setUsername(decoded.username);
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
    if (token) {
      setLoading(true);
      router.push(`/cart/${username}`); // Shallow routing
    } else {
      setLoading(true);

      router.push("/auth/signin");
    }
  };

  const handleOnClickOrder = () => {
    if (token) {
      setLoading(true);

      router.push(`/order/list-order/${username}`);
    } else {
      setLoading(true);

      router.push("/auth/signin");
    }
  };

  const handlePageAdmin = () => {
    setLoading(true);

    router.push(`/admin/${idUser}`);
  };

  const handlePageProfileUser = () => {
    setLoading(true);

    router.push(`/user/${username}`);
  };

  const handleClickRegister = (type: string) => {
    setLoading(true);
    setLastUrl(currentUrl);
    if (type === "register") router.push("/auth/signup");
    else router.push("/auth/signin");
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
    router.push("/");
    toast.warning("Succesfully logout!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <header className="w-full border-b bg-white">
      <ToastContainer />
      {/* Top Announcement Bar */}
      {showBanner && !token && (
        <div className="bg-black text-white flex px-6 py-2 text-sm">
          <div className="flex-1 text-center">
            <span>Sign up and get 20% off on your first order.</span>
            <button
              onClick={() => setShowBaner(false)}
              className="underline ml-2 "
            >
              <Link href="/auth/signup">Sign Up Now</Link>
            </button>
          </div>

          <button onClick={() => setShowBaner(false)}>
            <IoIosClose className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center text-center px-20 py-4">
        {/* Logo */}
        <div
          onClick={() => {
            if (currentUrl !== "/") setLoading(true);
          }}
          className="text-2xl text-black"
        >
          <Link className="mr-20" href="/">
            <span className="font-extrabold">YAKUSHOP.CO</span>
          </Link>
        </div>
        {!isHideMenu && (
          <div className="text-2xl text-black flex items-center content-center text-center w-full">
            {/* Nav Links */}
            <ul className="hidden md:flex space-x-6 text-sm font-medium items-center m-0">
              <li>
                <Link
                  href="/product/list-product/all"
                  className="p-1 hover:bg-gray-100 rounded"
                >
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
        )}

        {/* Search + Icons */}
        <div className="flex items-center space-x-4 w-full">
          <SearchInput setIsHideMenu={setIsHideMenu} isHideMenu={isHideMenu} />

          {/* Cart Icon */}
          <button
            onClick={handleOnClickCart}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <CardIcon />
          </button>

          <button
            onClick={handleOnClickOrder}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <OrderIcon />
          </button>

          {/* User Icon */}
          <Dropdown
            overlay={
              <Menu>
                {isLoggedIn ? (
                  <>
                    <Menu.Item onClick={handlePageProfileUser} key="2">
                      My Account
                    </Menu.Item>
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
