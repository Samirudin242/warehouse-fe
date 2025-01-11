"use client";

import React from "react";
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

// Registering the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalIncomeChart = () => {
  // Chart data
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // X-axis labels
    datasets: [
      {
        label: "Monthly Sales", // The label for the dataset
        data: [65, 59, 80, 81, 56, 55, 40], // The data values
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
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
        text: "Monthly Sales Data", // Chart title
      },
      legend: {
        position: "top" as const, // Position of the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the Y-axis starts at zero
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Total Income</h1>
        <div className="relative">
          <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300">
            All Time
            <span className="ml-2">▼</span>
          </button>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalIncomeChart;
