import React from "react";
import Link from "next/link";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
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
          <XMarkIcon className="w-4 h-4 text-white" />
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
              <Link href="/shop" className="hover:text-gray-700">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/on-sale" className="hover:text-gray-700">
                On Sale
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-gray-700">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-gray-700">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4  w-full">
          {/* Search Input */}
          <div className="flex items-center border rounded-full w-full bg-slate-100">
            <MagnifyingGlassIcon className="w-6 h-6 text-black ml-3 " />
            <input
              type="text"
              placeholder="Search for products..."
              className="hidden md:block w-64 rounded-full px-4 py-2 text-sm focus:outline-none text-black bg-slate-100 w-full"
            />
          </div>

          {/* Cart Icon */}
          <button>
            <ShoppingCartIcon className="w-6 h-6 text-black" />
          </button>

          {/* User Icon */}
          <button>
            <UserCircleIcon className="w-6 h-6 text-black" />
          </button>
        </div>
      </nav>
    </header>
  );
}
