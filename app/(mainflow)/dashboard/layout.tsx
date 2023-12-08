import React from "react";
import BubblingLinks from "@/app/components/BubblingLinks";
import { auth } from "@/app/auth";
import { db } from "@/db";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const user = await auth();

  const userVillages = await db.query.villages.findMany({
    where: (villages, { eq }) => eq(villages.userId, user!.user!.id),
  });
  return (
    <>
      {!!userVillages.length && <BubblingLinks />}
      {children}
    </>
  );
}
