import Link from "next/link";
import React from "react";
import UserBadge from "@/app/components/UserBadge";
import { auth } from "@/app/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills } from "@fortawesome/free-solid-svg-icons";
import { db } from "@/db";
import { redirect } from "next/navigation";
import SelectVillage from "@/app/components/SelectVillage/SelectVillage";

async function MainFlowLayout({ children }: { children: React.ReactElement }) {
  const user = await auth();

  const details = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user?.user?.id as string),
  });

  if (user && !details?.plan) {
    redirect("/new-user/plan");
  }

  const villages = await db.query.villages.findMany({
    where: (villages, { eq }) => eq(villages.userId, user?.user!.id!),
  });

  if (user && !villages.length) {
    redirect("/new-user/village");
  }

  const selectedVillage =
    villages.find((village) => village.id === details!.selectedVillage) ||
    villages[0];

  return (
    <>
      <header className="flex justify-between items-center p-4 border-mauve3 border-b">
        <nav className="flex items-center gap-3 h-full ">
          <Link href={"/dashboard"} className="text-4xl">
            <FontAwesomeIcon
              icon={faBookJournalWhills}
              className="text-orange11"
            />
          </Link>
          <div className="w-0.5 rounded-md py-4 bg-mauve3 rotate-12" />
          <SelectVillage
            villages={villages}
            activeVillage={selectedVillage}
            userId={user!.user!.id}
          />
        </nav>
        <UserBadge user={user!.user} />
      </header>

      {children}
    </>
  );
}

export default MainFlowLayout;
