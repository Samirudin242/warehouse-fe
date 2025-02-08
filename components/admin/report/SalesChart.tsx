"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
import { FiFilter } from "react-icons/fi";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import axiosRequest from "@/hooks/useAxios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SalesChart() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);
  const [dataProduct, setDataProduct] = useState<any[]>([]);

  const url = `${configUrl.apiUrlWarehouseService}/sales/all-by-productId`;
  const { data: dataChart, refresh: refreshDataChart } = useHookSwr(url);

  const { data: productsData, refresh: refreshDataListProduct } = useHookSwr(
    `${configUrl.apiUrlProductService}/product-public?size=10`
  );

  useEffect(() => {
    if (productsData?.content) {
      setDataProduct([
        { id: "All", name: "All Products" },
        ...productsData.content,
      ]);
    }
  }, [productsData]);

  const [dataChartsState, setDataChartsState] = useState({
    labels,
    datasets: [
      {
        label: "All Product",
        data: dataChart?.sales || new Array(12).fill(0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  });

  useEffect(() => {
    if (dataChart) {
      setDataChartsState((prev) => ({
        ...prev,
        datasets: [
          {
            label: "All Product",
            data: dataChart.sales || new Array(12).fill(0),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      }));
    }
  }, [dataChart]);

  const handleChange = async (selectedIds: string[]) => {
    if (selectedIds.length === 0) {
      setSelectedProducts(["All"]);
      return;
    }

    setSelectedProducts(selectedIds);

    const datasetsPromises = selectedIds
      .filter((id) => id !== "All")
      .map(async (id) => {
        const product = dataProduct.find((p) => p.id === id);
        const response = await axiosRequest({
          method: "GET",
          url: `${configUrl.apiUrlWarehouseService}/sales/all-by-productId?productId=${id}`,
        });

        return {
          label: response?.response?.data?.productName,
          data: response?.response?.data?.sales || new Array(12).fill(0),
          borderColor: getRandomRGBA(),
          backgroundColor: getRandomRGBA(0.2),
        };
      });

    const newDatasets = await Promise.all(datasetsPromises);

    setDataChartsState({
      labels,
      datasets: [
        {
          label: "All Product",
          data: dataChart?.sales || new Array(12).fill(0),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        ...newDatasets,
      ],
    });
  };

  const handleSearch = (value: string) => {
    refreshDataListProduct(
      `${configUrl.apiUrlProductService}/product-public?size=5&name=${value}`
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FiFilter className="text-gray-600" /> Total Income
        </h1>
        <div className="gap-4">
          <div className="text-sm mb-2">Select product</div>
          <Select
            className="w-60"
            mode="multiple"
            value={selectedProducts}
            onChange={handleChange}
            options={dataProduct.map((product) => ({
              value: product?.id,
              label: product.name,
            }))}
            onSearch={handleSearch}
            filterOption={false}
            placeholder="Select products..."
          />
        </div>
      </div>
      <Line
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
        data={dataChartsState}
      />
    </div>
  );
}

function getRandomRGBA(alpha: number = 1): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
