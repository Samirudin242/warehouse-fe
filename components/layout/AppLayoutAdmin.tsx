"use client";

import React, { useState } from "react";
import { LazyMotion } from "framer-motion";
import NavbarAdmin from "../navbar/NavbarAdmin";
import TopBarAdmin from "../navbar/TopBarAdmin";

const loadFramerMotionFeatures = () =>
  import("../../lib/framer-motion-features").then((mod) => mod.default);

export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayoutAdmin({ children }: AppLayoutProps) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const sidebarWidth = isSidebarMinimized ? "w-16" : "w-64"; // Dynamic width for sidebar

  return (
    <LazyMotion features={loadFramerMotionFeatures} strict={true}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-gray-800 text-white transition-all duration-300 z-20`}
        >
          <NavbarAdmin
            isMinimized={isSidebarMinimized}
            toggleSidebar={() => setIsSidebarMinimized(!isSidebarMinimized)}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300`}
          style={{ marginLeft: isSidebarMinimized ? "4rem" : "16rem" }}
        >
          {/* Top Bar */}
          <div className=" overflow-y-auto top-0 h-13 bg-gray-100 shadow-md z-30">
            <TopBarAdmin />
          </div>

          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto h-full bg-gray-50">
            {children}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
