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
import axiosRequest from "@/hooks/useAxios";

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

const sampleData: { [key: string]: number[] } = {
  "Product A": [65, 59, 80, 81, 56, 55, 40, 75],
  "Product B": [45, 70, 60, 90, 50, 40, 30, 85],
  "Product C": [55, 60, 70, 95, 80, 60, 50, 90],
};

function TotalIncomeChart() {
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [selectedProductName, setProductName] = useState<string>("All Product");

  const [dataProduct, setDataProduct] = useState<any[]>([]);

  const [listDataChart, setListDataChart] = useState<number[]>([]);

  const {
    data: datas,
    error,
    isLoading,
    refresh,
  } = useHookSwr(`${configUrl.apiUrlProductService}/product-public?size=5`);

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
    console.log(dataChart);
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
