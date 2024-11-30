"use client";

import React from "react";
import Head from "next/head";
import { LazyMotion } from "framer-motion";

const loadFramerMotionFeatures = () =>
  import("../../lib/framer-motion-features").then((mod) => mod.default);

export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <LazyMotion features={loadFramerMotionFeatures} strict={true}>
      {children}
    </LazyMotion>
  );
}
