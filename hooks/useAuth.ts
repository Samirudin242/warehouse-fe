import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { configUrl } from "@/config/configUrl";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/auth/signup", "/auth/signin"];

  useEffect(() => {
    // Get the access token from the cookie
    const authToken = Cookies.get("accessToken");

    // If accessToken exists, call the /auth/me API to verify the token
    if (authToken) {
      fetch(`${configUrl.apiUrl}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to authenticate");
          }
        })
        .then((_) => {
          setIsAuthenticated(true);
          router.push("/");
        })
        .catch((error) => {
          console.error("Error authenticating:", error);
          setIsAuthenticated(false);
          // if (!publicRoutes.includes(router.asPath)) {
          //   router.push("/auth/signin");
          // }
        });
    } else {
      setIsAuthenticated(false);

      // Redirect to login if trying to access protected routes
      // if (!publicRoutes.includes(router.pathname) && !authToken) {
      //   router.push("/auth/signin");
      // }
    }
  }, []); // Listen to route changes

  const logout = () => {
    Cookies.remove("accessToken", { path: "/" });
    setIsAuthenticated(false);
    router.push("/auth/signin");
  };

  return { isAuthenticated, logout };
}
