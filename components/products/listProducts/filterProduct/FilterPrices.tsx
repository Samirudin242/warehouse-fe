"use client";
import React, { useState } from "react";

interface FilterPriceSliderProps {
  min: number;
  max: number;
  onPriceChange?: (range: [number, number]) => void;
}

export default function FilterPrices({
  min,
  max,
  onPriceChange,
}: FilterPriceSliderProps) {
  const [range, setRange] = useState<[number, number]>([min, max]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);
    setRange((prev) => {
      const newRange: [number, number] =
        type === "min" ? [value, prev[1]] : [prev[0], value];
      return newRange;
    });
    // onPriceChange(newRange);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Price Range</h2>

      <div className="mt-3">
        <input
          type="range"
          min={min}
          max={max}
          value={range[0]}
          onChange={(e) => handleChange(e, "min")}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range[1]}
          onChange={(e) => handleChange(e, "max")}
          className="w-full mt-1 bg-black slide"
        />
      </div>
      <p className="text-sm mt-2 text-gray-600">
        ${range[0]} - ${range[1]}
      </p>
    </div>
  );
}
