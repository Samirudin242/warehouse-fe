import Image from "next/image";
import React from "react";

export default function Carousel1() {
  return (
    <div
      style={{
        height: "500px",
      }}
      className="bg-slate-100 h-full px-28 w-full flex justify-between"
    >
      {/** component */}
      <div
        style={{
          width: "600px",
        }}
        className="mt-14"
      >
        <div className="w-full">
          <h1 className="text-5xl font-extrabold">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <h3 className="mt-5">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </h3>
          <button className="bg-black text-white py-3 px-10 rounded-3xl mt-5">
            Shop Now
          </button>
          <div className="flex justify-between mt-10">
            <div>
              <h2 className="font-bold text-3xl">200+</h2>
              <p>International Brands</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">2000+</h2>
              <p>High-Quality Products</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">30,000+</h2>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
      {/** image */}
      <div>
        <Image
          className="absolute mt-56"
          src={"/vector.png"}
          alt="photo1"
          width={40}
          height={40}
        />
        <Image
          className="absolute mt-12 ml-96"
          src={"/vector.png"}
          alt="photo1"
          width={70}
          height={70}
        />
        <div className="-m-1">
          <Image src="/photo1.png" alt="photo1" width={500} height={400} />
        </div>
      </div>
    </div>
  );
}
