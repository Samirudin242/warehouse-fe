import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface AxiosRequestProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  config?: AxiosRequestConfig;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

const axiosRequest = async ({
  url,
  method = "GET",
  body = null,
  config = {},
  headers = {},
  withCredentials = true,
}: AxiosRequestProps): Promise<{
  response: AxiosResponse | null;
  error: AxiosError | null;
}> => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers,
      withCredentials,
      ...config,
    });
    return { response, error: null };
  } catch (error) {
    return { response: null, error: error as AxiosError };
  }
};

export default axiosRequest;
