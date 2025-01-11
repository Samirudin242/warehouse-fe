import { jwtDecode } from "jwt-decode"; // For decoding JWT
import Cookies from "js-cookie"; // Client-side cookie management

// Define the token payload interface
interface TokenPayload {
  sub: string; // User ID
  username: string; // Username
  email: string; // Email
  role: string; // Role
  iat: number; // Issued at (epoch time)
  exp: number; // Expiration time (epoch time)
}

// Function to decode the token
const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Retrieve the token from cookies
const token = Cookies.get("accessToken");

if (token) {
  // Decode the token if it exists in the cookie
  const payload = decodeToken(token);

  if (payload) {
    console.log("Decoded Payload:", payload);
  } else {
    console.error("Failed to decode the token.");
  }
} else {
  console.error("No access token found in cookies.");
}
