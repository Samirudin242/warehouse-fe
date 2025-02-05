import { useAppContext } from "@/contexts/useContext";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { user } = useAppContext();
  const token = req.cookies.get("token");

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user.role == "CUSTOMER" && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/admin/:path*"],
};
