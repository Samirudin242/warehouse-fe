import React, { useEffect } from "react";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import { formatToRupiah } from "@/utils/formatPrice";
import { useAppContext } from "@/contexts/useContext";

export default function DashboardOverview() {
  const { roles } = useAppContext();

  const roleId = roles?.find((r) => r.role_name === "CUSTOMER")?.id;
  const { data: totalUser } = useHookSwr(
    `${configUrl.apiUrlUserService}/user/get-all-users-percentage`,
    {
      refreshInterval: 10000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const { data: totalIncome } = useHookSwr(
    `${configUrl.apiUrlWarehouseService}/sales/all-income`,
    {
      refreshInterval: 10000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const { data: dataUser, refresh: refreshDataUser } = useHookSwr(
    `${configUrl.apiUrlUserService}/user?size=4&role=${roleId}`,
    {
      refreshInterval: 10000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (roleId) {
      refreshDataUser(
        `${configUrl.apiUrlUserService}/user?size=4&role=${roleId}`
      );
    }
  }, [roleId]);

  return (
    <div className=" bg-gray-50 mt-3">
      {/* Header */}

      {/* Statistics Section */}
      <div className=" bg-white shadow-md p-5 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <div className="relative">
            {/* <button className="flex items-center px-4 py-2 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300">
              All Time
              <span className="ml-2">▼</span>
            </button> */}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 flex justify-between items-center bg-gray-50 px-4 py-6 rounded-lg">
            <div>
              <h2 className="text-gray-500">Customer</h2>
              <p className="text-2xl font-bold">{totalUser?.totalUser}</p>
            </div>
            <div
              className={`${
                totalUser?.percentage > 1
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }  px-3 py-1 rounded-full`}
            >
              {totalUser?.percentage}
            </div>
          </div>
          <div className="flex-1 flex justify-between items-center bg-gray-50 px-4 py-6 rounded-lg">
            <div>
              <h2 className="text-gray-500">Income</h2>
              <p className="text-2xl font-bold">
                {formatToRupiah(totalIncome?.totalIncome)}
              </p>
            </div>
            <div
              className={`${
                totalIncome?.percentage > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              } px-3 py-1 rounded-full`}
            >
              {totalIncome?.percentage} %
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-4">
            Welcome to our{" "}
            <span className="font-semibold">new online experience</span>
          </h2>

          {/* Users Section */}
          <div className="flex gap-8 items-center justify-between ">
            {dataUser?.content?.map((user: any, index: number) => (
              <div key={index} className="text-center">
                <img
                  src={
                    user?.profile_picture
                      ? user?.profile_picture
                      : "/images/self.png"
                  }
                  alt={user?.profile_picture}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <p className="text-gray-700 font-medium">{user?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
