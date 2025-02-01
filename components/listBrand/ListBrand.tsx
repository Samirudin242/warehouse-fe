import Image from "next/image";
import React from "react";

export default function ListBrand() {
  return (
    <div className="bg-black px-20 py-8 flex justify-between">
      <Image
        src={
          "https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/versace.png"
        }
        alt="Logo"
        width={110}
        height={10}
      />
      <Image
        src={
          "https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/zara.png"
        }
        alt="Logo"
        width={110}
        height={10}
      />
      <Image
        src={
          "https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/gucci.png"
        }
        alt="Logo"
        width={110}
        height={10}
      />
      <Image
        src={
          "https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/prada.png"
        }
        alt="Logo"
        width={110}
        height={10}
      />
      <Image
        src={
          "https://storage.googleapis.com/theyaku-bucket11/products/160cbef5-b712-4cdd-90dc-7890fed18219/calvin.png"
        }
        alt="Logo"
        width={110}
        height={10}
      />
    </div>
  );
}
