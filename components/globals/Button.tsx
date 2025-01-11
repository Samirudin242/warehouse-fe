import React from "react";

interface Props {
  text: string;
}

export default function ButtonComponent({ text }: Props) {
  return (
    <div>
      <button className="border py-2 px-10 rounded-3xl text-black">
        {text}
      </button>
    </div>
  );
}
