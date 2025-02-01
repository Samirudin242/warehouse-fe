import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Carousel2() {
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
      <div
        style={{
          width: "600px",
        }}
        className="mt-14"
      >
        <div className="w-full">
          <h1 className="text-5xl font-extrabold">
            DISCOVER YOUR NEXT FAVORITE OUTFIT
          </h1>
          <h3 className="mt-5">
            Explore our curated collection of premium apparel, where every piece
            tells a story and aligns with your unique personality.
          </h3>
          <button
            onClick={handleClickShop}
            className="bg-black text-white py-3 px-10 rounded-3xl mt-5"
          >
            Start Exploring
          </button>
          <div className="flex justify-between mt-10">
            <div>
              <h2 className="font-bold text-3xl">150+</h2>
              <p>Exclusive Collections</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">5000+</h2>
              <p>Trending Items</p>
            </div>
            <div>
              <h2 className="font-bold text-3xl">50,000+</h2>
              <p>Satisfied Shoppers</p>
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
        <div className="-mt-32">
          <Image
            src="https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/photo2.png"
            alt="highlighted outfit"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
