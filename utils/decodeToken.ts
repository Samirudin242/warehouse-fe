import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface TokenPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const token = Cookies.get("accessToken");

if (token) {
  const payload = decodeToken(token);

  if (payload) {
    console.log("Decoded Payload:", payload);
  } else {
    console.error("Failed to decode the token.");
  }
} else {
  console.error("No access token found in cookies.");
}
