"use client";
import Checkbox from "@/ui/Checkbox";
import getFormData from "@/utils/getFormData";
import { Session } from "next-auth";
import React, { FormEvent, useState } from "react";

export default function PlanForm({ user }: { user: Session["user"] }) {
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormData(event.currentTarget);
    alert(`set plan for user:${user?.name}`);
  };

  return (
    <form className="max-w-sm w-full" onSubmit={handleSubmit}>
      <fieldset className="">
        <label className="text-lg text-mauve10">Plan type</label>
        <ul className="space-y-4 mt-1">
          <li className="border-2 border-mauve4 rounded-md p-2  flex items-center">
            <div className="w-full">
              <h2>Hobby</h2>
              <p className="text-mauve11">
                Best for small and personal projects
              </p>
            </div>
            <Checkbox
              checked={checked}
              onCheckedChange={setChecked}
              className=" border-2 text-mauve1 data-[state=checked]:bg-orange10 data-[state=checked]:border-orange10 border-mauve6 rounded-full h-6 w-6 flex justify-center items-center mr-2"
            />
          </li>
          <li className="border-2 border-mauve4 rounded-md p-2 pointer-events-none opacity-50">
            <h2>Pro</h2>
            <p className="text-mauve11">Best for big and enterprise projects</p>
          </li>
        </ul>
      </fieldset>

      <button
        className=" w-full mt-12 p-4 text-center rounded bg-mauve12 text-mauve1 disabled:opacity-50"
        disabled={!checked}
      >
        Continue
      </button>
    </form>
  );
}
