"use client";
import React from "react";

interface ReportFiltersProps {
  warehouses: string[];
  categories: string[];
  products: string[];
  selectedWarehouse: string | null;
  selectedCategory: string | null;
  selectedProduct: string | null;
  onFilterChange: (type: string, value: string | null) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  warehouses,
  categories,
  products,
  selectedWarehouse,
  selectedCategory,
  selectedProduct,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="border px-4 py-2 rounded w-1/4"
        value={selectedWarehouse || ""}
        onChange={(e) => onFilterChange("warehouse", e.target.value || null)}
      >
        <option value="">All Warehouses</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse} value={warehouse}>
            {warehouse}
          </option>
        ))}
      </select>

      <select
        className="border px-4 py-2 rounded w-1/4"
        value={selectedCategory || ""}
        onChange={(e) => onFilterChange("category", e.target.value || null)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="border px-4 py-2 rounded w-1/4"
        value={selectedProduct || ""}
        onChange={(e) => onFilterChange("product", e.target.value || null)}
      >
        <option value="">All Products</option>
        {products.map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReportFilters;
