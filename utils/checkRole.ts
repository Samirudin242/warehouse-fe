// utils/roleCheck.ts
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const useCheckRoleAndRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);

      if (
        decoded.role !== "SUPER_ADMIN" &&
        decoded.role !== "WAREHOUSE_ADMIN"
      ) {
        router.push("/");
      }
    } else {
      router.push("/login");
    }
  }, [router]);
};
