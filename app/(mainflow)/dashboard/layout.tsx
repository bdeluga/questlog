import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import BubblingLinks from "@/app/components/BubblingLinks";
async function DashboardLayout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <BubblingLinks />
      <section className="p-6">{children}</section>
    </>
  );
}

export default DashboardLayout;
