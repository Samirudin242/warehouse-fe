"use client";

import React, { Suspense, useEffect } from "react";
import { DashboardSkeleton } from "@/components/skeletonLoading/DashboardSkeleton";
import dynamic from "next/dynamic";
import { useAppContext } from "@/contexts/useContext";
import { useCheckRoleAndRedirect } from "@/utils/checkRole";

const DashboardOverview = dynamic(
  () => import("@/components/admin/dashboard/Overview"),
  {
    loading: () => <DashboardSkeleton type="overview" />,
    ssr: false,
  }
);

const TotalIncomeChart = dynamic(
  () => import("@/components/admin/dashboard/TotalIncomeChart"),
  {
    loading: () => <DashboardSkeleton type="chart" />,
    ssr: false,
  }
);

const PopularProductsList = dynamic(
  () => import("@/components/admin/dashboard/PopularProduct"),
  {
    loading: () => <DashboardSkeleton type="list" />,
    ssr: false,
  }
);

const CommentList = dynamic(
  () => import("@/components/admin/dashboard/CommentList"),
  {
    loading: () => <DashboardSkeleton type="list" />,
    ssr: false,
  }
);

function DashboardPage() {
  const { setLoading, user } = useAppContext();

  useCheckRoleAndRedirect();

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <div className="text-black p-5 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <Suspense fallback={<DashboardSkeleton type="overview" />}>
            <DashboardOverview />
          </Suspense>

          <Suspense fallback={<DashboardSkeleton type="chart" />}>
            <TotalIncomeChart />
          </Suspense>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Suspense fallback={<DashboardSkeleton type="list" />}>
            <PopularProductsList />
          </Suspense>

          <Suspense fallback={<DashboardSkeleton type="list" />}>
            <CommentList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
