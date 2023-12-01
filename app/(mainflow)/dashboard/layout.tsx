import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import BubblingLinks from "../components/BubblingLinks";
async function DashboardLayout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <BubblingLinks />
      <section className="p-6">{children}</section>
    </>
  );
}

export default DashboardLayout;
