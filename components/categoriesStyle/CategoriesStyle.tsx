import Image from "next/image";
import React from "react";

export default function CategoriesStyle() {
  return (
    <div className=" px-20">
      <div className="bg-customGray h-100 py-10 px-10 rounded-3xl content-center">
        <h1 className="text-center text-4xl font-extrabold mb-10">
          BROWSE BY DRESS STYLE
        </h1>
        <div className="flex space-x-10 justify-center">
          <div className="bg-white flex rounded-lg overflow-hidden">
            <h1 className="text-4xl px-10 py-10 text-black">Casual</h1>
            <Image
              className="rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
              src="/casual.png"
              alt="casual"
              width={300}
              height={300}
            />
          </div>
          <div className="bg-white flex rounded-lg overflow-hidden">
            <div className="text-4xl px-10 py-10 text-black">Formal</div>
            <Image
              className="rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
              src="/formal.png"
              alt="casual"
              width={500}
              height={300}
            />
          </div>
        </div>
        <div className="flex space-x-10 mt-10 cursor-pointer justify-center">
          <div className="bg-white flex rounded-lg overflow-hidden">
            <h1 className="text-4xl px-10 py-10 text-black">Casual</h1>
            <Image
              className="rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
              src="/party.png"
              alt="casual"
              width={500}
              height={300}
            />
          </div>
          <div className="bg-white flex rounded-lg overflow-hidden cursor-pointer">
            <div className="text-4xl px-10 py-10 text-black">Gym</div>
            <Image
              className="rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
              src="/gym.png"
              alt="casual"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
