"use client";
import AppLayout from "@/components/layout/AppLayout";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "./globals.css";
import AppLayoutAdmin from "@/components/layout/AppLayoutAdmin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const isAuthRoute = authRoutes.includes(pathname);
  const isAdminPage = pathname.startsWith("/admin");
  const { isAuthenticated } = useAuth();

  return (
    <html lang="en">
      <title>Warehouse</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
      />
      <body>
        {isAuthRoute ? (
          children
        ) : isAdminPage ? (
          <AppLayoutAdmin>{children}</AppLayoutAdmin>
        ) : (
          <AppLayout>{children}</AppLayout>
        )}
      </body>
    </html>
  );
}
