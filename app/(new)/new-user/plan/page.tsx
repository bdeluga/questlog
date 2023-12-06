import { auth } from "@/app/auth";
import PlanForm from "@/app/components/forms/PlanForm";

import React from "react";

export default async function PlanPage() {
  const user = await auth();

  return (
    <div className="min-h-screen flex flex-col font-bold justify-center items-center">
      <h1 className="text-4xl mb-4 text-center">
        Choose a <span className="text-orange10">Questlog</span>
        <br /> account plan
      </h1>
      <PlanForm user={user?.user} />
    </div>
  );
}
