import React from "react";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <div className="px-20 text-black mt-40 bg-customGray">
      <div className="flex items-center justify-center">
        <div className="w-90 flex bg-black rounded-2xl py-10 px-10 -mt-20">
          <div className="text-white flex-1">
            <h1 className="text-3xl font-bold">
              STAY UPTODATE ABOUT OUR LATEST OFFERS
            </h1>
          </div>
          <div className="text-white flex-1">
            <div className="flex bg-white h-10 rounded-xl py-1 px-3 justify-normal al">
              <HiOutlineMail className="text-black text-3xl text-center mr-2" />
              <input
                className="rounded-lg mb-5 h-8 w-full outline-none text-black"
                placeholder="Enter your email address"
              />
            </div>
            <button className="w-full bg-white text-black py-2 rounded-xl px-2 text-md mt-3">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-10">
        <div className="max-w-52">
          <h1 className="text-2xl font-bold">YAKUSHOP.CO</h1>
          <h3 className="font-extralight">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </h3>
          <div className="flex gap-3">
            <AiFillTwitterCircle className="text-xl" />
            <FaFacebook className="text-xl" />
            <FaInstagram className="text-xl" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">COMPANY</h1>
          <div>
            <h3 className="font-thin">About</h3>
            <h3 className="font-thin">Features</h3>
            <h3 className="font-thin">Works</h3>
            <h3 className="font-thin">Career</h3>
          </div>
        </div>
        <div>
          <h1 className="font-bold">HELP</h1>
          <div>
            <h3 className="font-thin">About</h3>
            <h3 className="font-thin">Features</h3>
            <h3 className="font-thin">Works</h3>
            <h3 className="font-thin">Career</h3>
          </div>
        </div>
        <div>
          <h1 className="font-bold">FAQ</h1>
          <div>
            <h3 className="font-thin">Account</h3>
            <h3 className="font-thin">Manage Deliveries</h3>
            <h3 className="font-thin">Orders</h3>
            <h3 className="font-thin">Payments</h3>
          </div>
        </div>
        <div>
          <h1 className="font-bold">RESOURCES</h1>
          <div>
            <h3 className="font-thin">Free eBooks</h3>
            <h3 className="font-thin">Development Tutorial</h3>
            <h3 className="font-thin">How to - Blog</h3>
            <h3 className="font-thin">Youtube Playlist</h3>
          </div>
        </div>
      </div>
      <div className="border w-full"></div>
      <div className="py-10">© 2024-2025, All rights reserved</div>
    </div>
  );
}
