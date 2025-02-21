"use client";
import ReportFilters from "@/components/admin/report/ReportFilters";
import SalesChart from "@/components/admin/report/SalesChart";
import { useAppContext } from "@/contexts/useContext";
import { useCheckRoleAndRedirect } from "@/utils/checkRole";
import React, { useEffect, useState } from "react";

function AdminReportsPage() {
  const { setLoading } = useAppContext();

  const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"];
  const categories = ["Electronics", "Clothing", "Furniture"];
  const products = ["Product 1", "Product 2", "Product 3"];

  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useCheckRoleAndRedirect();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFilterChange = (type: string, value: string | null) => {
    if (type === "warehouse") setSelectedWarehouse(value);
    if (type === "category") setSelectedCategory(value);
    if (type === "product") setSelectedProduct(value);
  };

  const labels = ["January", "February", "March", "April", "May"];
  const data = [500, 700, 600, 800, 900];
  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Sales Reports</h1>

      <SalesChart />
    </div>
  );
}

export default AdminReportsPage;
