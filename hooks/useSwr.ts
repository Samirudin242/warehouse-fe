"use client";
import { useState } from "react";
import useSWR from "swr";

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

const useHookSwr = (initialUrl: string | null) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const { data, error, isLoading, mutate } = useSWR(currentUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    data,
    error,
    isLoading,
    refresh: (newUrl?: string) => {
      const urlToUse = newUrl || currentUrl;
      setCurrentUrl(urlToUse);
      return mutate(fetcher(urlToUse!));
    },
  };
};

export default useHookSwr;
