"use client";

import React, { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import { useAppContext } from "@/contexts/useContext";

type PropsCardIcon = {
  idUser: string;
};

export default function CardIcon({ idUser }: PropsCardIcon) {
  const { user } = useAppContext();

  const { data, refresh, error, isLoading } = useHookSwr(
    user.id ? `${configUrl.apiUrlProductService}/cart/${user.id}` : null
  );

  return (
    <div className="flex items-center">
      <LuShoppingCart className="w-6 h-6 text-black" />
      {data?.length > 0 && (
        <div className="text-red-500 border-red-500 rounded-xl text-xs px-1 -ml-2 bg-red-200">
          {data?.length}
        </div>
      )}
    </div>
  );
}
