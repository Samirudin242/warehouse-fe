import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

export default function ButtonComponent({ text, onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className="border py-2 px-10 rounded-3xl text-black"
      >
        {text}
      </button>
    </div>
  );
}
