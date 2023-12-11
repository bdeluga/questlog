"use client";
import addPlanAction from "@/app/actions/addPlanAction";
import useToast from "@/app/hooks/useToast";
import Checkbox from "@/ui/Checkbox";
import React, { useState } from "react";

export default function PlanForm({ userId }: { userId: string }) {
  const toast = useToast();

  const [checked, setChecked] = useState(false);

  const clientAction = async (formData: FormData) => {
    await addPlanAction(formData, userId)
      .then(() => {
        toast.notify({
          title: "Success",
          description: "Account plan was succesfully updated.",
        });
      })
      .catch((err) => {
        toast.notify({
          title: "Error",
          description:
            "There was an error updating your plan, log in and try again",
        });
      });
  };

  return (
    <form className="max-w-sm w-full" action={clientAction}>
      <label className="text-lg text-mauve10">Plan type</label>
      <ul className="space-y-4 mt-1">
        <li className="border-2 border-mauve4 rounded-md p-2  flex items-center">
          <div className="w-full">
            <h2>Hobby</h2>
            <p className="text-mauve11">Best for small and personal projects</p>
          </div>
          <Checkbox
            checked={checked}
            name="plan"
            value="hobby"
            onCheckedChange={() => setChecked(!checked)}
            className=" border-2 text-mauve1 data-[state=checked]:bg-orange10 data-[state=checked]:border-orange10 border-mauve6 rounded-full h-6 w-6 flex justify-center items-center mr-2"
          />
        </li>
        <li className="border-2 border-mauve4 rounded-md p-2 opacity-25  flex items-center">
          <div className="w-full">
            <h2>Pro</h2>
            <p className="text-mauve11">Best for big and enterprise projects</p>
          </div>
          <Checkbox
            disabled
            name="plan"
            value="pro"
            className=" border-2 text-mauve1 data-[state=checked]:bg-orange10 data-[state=checked]:border-orange10 border-mauve6 rounded-full h-6 w-6 flex justify-center items-center mr-2"
          />
        </li>
      </ul>

      <button
        className=" w-full mt-12 p-4 text-center rounded bg-mauve12 text-mauve1 disabled:opacity-50"
        disabled={!checked}
      >
        Continue
      </button>
    </form>
  );
}
