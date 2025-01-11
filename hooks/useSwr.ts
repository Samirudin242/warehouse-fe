import useSWR from "swr";
import Cookies from "js-cookie";

const authToken = Cookies.get("accessToken");

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
};

const useSwr = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  };
};

export default useSwr;
