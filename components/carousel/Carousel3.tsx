import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Carousel3() {
  const router = useRouter();

  const handleClickShop = () => {
    router.push("/product/list-product/all");
  };

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
            ELEVATE YOUR WARDROBE EFFORTLESSLY
          </h1>
          <h3 className="mt-5">
            Uncover timeless pieces that blend elegance with everyday comfort.
            Transform your wardrobe into a true reflection of your style and
            confidence.
          </h3>
          <button
            onClick={handleClickShop}
            className="bg-black text-white py-3 px-10 rounded-3xl mt-5"
          >
            Explore Collection
          </button>
          <div className="flex justify-between mt-10">
            <div>
              <h2 className="font-bold text-3xl">100+</h2>
              <p>Luxury Designers</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">4000+</h2>
              <p>Exclusive Items</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">70,000+</h2>
              <p>Loyal Customers</p>
            </div>
          </div>
        </div>
      </div>
      {/** image */}
      <div>
        <Image
          className="absolute mt-12 ml-96"
          src={"/vector.png"}
          alt="decorative vector"
          width={40}
          height={40}
        />
        <Image
          className="absolute mt-56"
          src={"/vector.png"}
          alt="decorative vector"
          width={70}
          height={70}
        />
        <div>
          <Image
            src="/photo3.png"
            alt="luxury outfit"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
