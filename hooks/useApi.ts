import Cookies from "js-cookie";

const authToken = Cookies.get("accessToken");

const useAPI = async (
  url: string,
  method: string,
  data?: any,
  isFormData?: boolean
) => {
  try {
    const headers: HeadersInit = {
      Authorization: `Bearer ${authToken}`,
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const post = await fetch(url, {
      method,
      headers,
      credentials: "include",
      body: isFormData ? data : JSON.stringify(data),
    });
    const response = await post.json();

    if (response.status !== 200) {
      throw new Error(response.message || "Failed to submit data");
    }
    return response;
  } catch (err: any) {
    return err;
  }
};

export default useAPI;
