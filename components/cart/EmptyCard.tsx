import React from "react";

function EmptyCard() {
  return (
    <div className="max-w-xl mx-auto mt-32 mb-42 rounded-lg p-6 bg-white">
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-gray-500 text-center">Your cart is empty!</p>
        <img
          src="/empty-cart.png"
          className="mix-blend-multiply object-contain w-full"
        />
      </div>
    </div>
  );
}

export default EmptyCard;
