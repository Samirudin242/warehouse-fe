import useSWR from "swr";
import Cookies from "js-cookie";

const authToken = Cookies.get("accessToken");

const fetcher = async (url: string) => {
  console.log("AuthToken:", authToken); // Debugging
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Debug response cookies and headers
  console.log("Response Headers:", response.headers);
  console.log("Set-Cookie:", response.headers.get("set-cookie"));

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
