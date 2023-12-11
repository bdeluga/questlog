import { auth } from "@/app/auth";
import AddVillageForm from "@/app/components/forms/AddVillageForm";
import PlanForm from "@/app/components/forms/PlanForm";
import { db } from "@/db";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";

import React from "react";

export default async function PlanPage() {
  const user = await auth();

  if (!user?.user) {
    redirect("/sign-in");
  }

  const villages = await db.query.villages.findMany({
    where: (villages, { eq }) => eq(villages.userId, user?.user!.id as string),
  });

  if (!!villages.length) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col font-bold justify-center items-center">
      <h1 className="text-4xl mb-4 text-center leading-snug">
        Create your first <br />
        <span className="text-orange10">Questlog </span> village
      </h1>
      <div className="p-4 mt-4 bg-mauve2 border border-mauve4 rounded max-w-sm w-full">
        <AddVillageForm userId={user?.user?.id} />
      </div>
      <span className="text-sm text-mauve11 mt-2">
        <FontAwesomeIcon icon={faTriangleExclamation} /> Mercenaries will
        populate your village later.
      </span>
    </div>
  );
}
