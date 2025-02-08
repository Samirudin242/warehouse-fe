"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Select } from "antd";
import { FiFilter } from "react-icons/fi";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
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

function TotalIncomeChart() {
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [selectedProductName, setProductName] = useState<string>("All Product");

  const [dataProduct, setDataProduct] = useState<any[]>([]);

  const {
    data: datas,
    error,
    isLoading,
    refresh,
  } = useHookSwr(`${configUrl.apiUrlProductService}/product-public?size=5`, {
    refreshInterval: 10000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const url = `${
    configUrl.apiUrlWarehouseService
  }/sales/all-by-productId?productId=${
    selectedProduct == "All" || !selectedProduct ? "" : selectedProduct
  }`;

  const { data: dataChart, refresh: refreshDataChart } = useHookSwr(url);

  useEffect(() => {
    if (datas?.content) {
      const list = {
        id: "All",
        name: "All Products",
      };
      setDataProduct([list, ...datas.content]);
    }
  }, [datas]);

  const handleSearch = (value: string) => {
    refresh(
      `${configUrl.apiUrlProductService}/product-public?size=5&name=${value}`
    );
  };

  const handleChange = (e: string) => {
    setSelectedProduct(e);
    const product = dataProduct.find((p) => p.id == e);
    setProductName(product?.name);

    refreshDataChart(
      `${configUrl.apiUrlWarehouseService}/sales/all-by-productId?productId=${
        e == "All" || !e ? "" : e
      }`
    );
  };

  // Chart data
  const data = {
    labels: months,
    datasets: [
      {
        label: `${selectedProductName}`,
        data: dataChart?.sales || new Array(12).fill(0),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FiFilter className="text-gray-600" /> Total Income
        </h1>
        <div className=" gap-4">
          <div className="text-sm mb-2">Select product</div>
          <Select
            className="w-40"
            value={selectedProduct}
            onChange={(e) => {
              handleChange(e);
            }}
            options={dataProduct.map((product: any) => ({
              value: product.id,
              label: product.name,
            }))}
            showSearch
            onSearch={handleSearch}
            placeholder="Search product..."
            filterOption={false}
          />
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TotalIncomeChart;
