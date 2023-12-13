import Link from "next/link";
import React from "react";
import UserBadge from "@/app/components/UserBadge";
import { auth } from "@/app/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills } from "@fortawesome/free-solid-svg-icons";
import { db } from "@/db";
import { redirect } from "next/navigation";
import SelectVillage from "@/app/components/SelectVillage/SelectVillage";

async function MainAuthFlow({ children }: { children: React.ReactElement }) {
  const user = await auth();

  const userDetails = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user?.user?.id as string),
    with: {
      villages: true,
    },
  });

  const villages = userDetails?.villages;

  if (user && !userDetails?.plan) {
    redirect("/new-user/plan");
  }

  if (user && !villages?.length) {
    redirect("/new-user/village");
  }

  const selectedVillage =
    villages?.find((village) => village.id === userDetails!.selectedVillage) ||
    villages?.at(0);

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
            villages={villages!}
            activeVillage={selectedVillage!}
            userId={user!.user!.id}
          />
        </nav>
        <UserBadge user={userDetails!} />
      </header>

      {children}
    </>
  );
}

export default MainAuthFlow;
