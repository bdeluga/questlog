import { auth } from "@/app/auth";
import PlanForm from "@/app/components/forms/PlanForm";
import { db } from "@/db";
import { redirect } from "next/navigation";

import React from "react";

export default async function PlanPage() {
  const user = await auth();

  const details = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user?.user?.id as string),
  });

  if (details?.plan) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col font-bold justify-center items-center">
      <h1 className="text-4xl mb-4 text-center">
        Choose a <span className="text-orange10">Questlog</span>
        <br /> account plan
      </h1>
      <PlanForm />
    </div>
  );
}
