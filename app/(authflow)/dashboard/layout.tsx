import React from "react";
import BubblingLinks from "@/app/components/BubblingLinks";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      {<BubblingLinks />}
      {children}
    </>
  );
}
