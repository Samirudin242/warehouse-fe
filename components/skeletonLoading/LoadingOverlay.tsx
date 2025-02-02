"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useAppContext } from "@/contexts/useContext";
import { Spin } from "antd";

const LoadingOverlay = () => {
  const { loading } = useAppContext();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-white text-xl font-semibold">
        <img src="/loading.gif" alt="Loading..." height={200} width={300} />
        <p className="text-center -mt-10 text-black">Loading ...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
