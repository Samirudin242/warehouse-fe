import Image from "next/image";
import React from "react";

export default function ListBrand() {
  return (
    <div className="bg-black px-20 py-8 flex justify-between">
      <Image src={"/versace.png"} alt="Logo" width={110} height={10} />
      <Image src={"/zara.png"} alt="Logo" width={110} height={10} />
      <Image src={"/gucci.png"} alt="Logo" width={110} height={10} />
      <Image src={"/prada.png"} alt="Logo" width={110} height={10} />
      <Image src={"/calvin.png"} alt="Logo" width={110} height={10} />
    </div>
  );
}
