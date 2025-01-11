import CommentList from "@/components/admin/dashboard/CommentList";
import DashboardOverview from "@/components/admin/dashboard/Overview";
import PopularProductsList from "@/components/admin/dashboard/PopularProduct";
import TotalIncomeChart from "@/components/admin/dashboard/TotalIncomeChart";
import React from "react";

function page() {
  return (
    <div className="text-black p-5">
      <h1 className="text-2xl">Dashborad</h1>
      <div className="flex justify-between gap-4">
        <div className="w-2/3">
          <DashboardOverview />
          <TotalIncomeChart />
        </div>
        <div className="w-1/3">
          <PopularProductsList />
          <CommentList />
        </div>
      </div>
    </div>
  );
}

export default page;
