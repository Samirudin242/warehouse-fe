import useSWR from 'swr';
import Cookies from 'js-cookie';  // Client-side cookie management


const authToken = Cookies.get("accessToken")

const fetcher = (url: string,) => fetch(url, {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${authToken}`,  
    'Content-Type': 'application/json'
  },
  credentials: "include"
}).then(res => res.json());

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
