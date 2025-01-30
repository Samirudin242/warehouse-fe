"use client";
import { useState } from "react";
import useSWR, { SWRConfiguration } from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

const useHookSwr = (
  initialUrl: string | null,
  swrOptions?: SWRConfiguration
) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  const mergedOptions: SWRConfiguration = {
    refreshInterval: 5000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...swrOptions,
  };

  const { data, error, isLoading, mutate } = useSWR(
    currentUrl,
    fetcher,
    mergedOptions
  );

  return {
    data,
    error,
    isLoading,
    refresh: (newUrl?: string) => {
      const urlToUse = newUrl || currentUrl;
      setCurrentUrl(urlToUse);
      return mutate();
    },
    mutate,
  };
};

export default useHookSwr;
