"use client";
import React, { useState } from "react";
import { Slider, Card, Typography, Space } from "antd";
import { FaDollarSign } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";

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

  const handleChange = (value: any) => {
    setRange(value);
    onPriceChange?.(value);
  };

  return (
    <Card
      title={
        <Space>
          <GiPriceTag className="text-lg text-blue-600" />
          <Typography.Text strong>Price Range</Typography.Text>
        </Space>
      }
      className="shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaDollarSign className="text-gray-500" />
        <Slider
          range
          min={min}
          max={max}
          value={range}
          onChange={handleChange}
          className="flex-grow"
          tooltip={{ formatter: (value) => `$${value}` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <FaDollarSign className="text-gray-500 text-xs" />
          <Typography.Text strong className="font-mono">
            {range[0]}
          </Typography.Text>
        </div>
        <span className="mx-2">-</span>
        <div className="flex items-center gap-1">
          <FaDollarSign className="text-gray-500 text-xs" />
          <Typography.Text strong className="font-mono">
            {range[1]}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}
