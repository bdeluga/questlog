import { User } from "@/db/schema";
import Checkbox from "@/ui/Checkbox";
import { useState } from "react";

interface Props {
  updateForm: (plan: User["plan"]) => void;
  value: User["plan"];
}

export default function Plan({ updateForm, value }: Props) {
  return (
    <div className="h-48">
      <label className="text-lg text-mauve10">Plan type</label>
      <ul className="space-y-4 mt-1">
        <li className="border-2 border-mauve4 rounded-md p-2  flex items-center">
          <div className="w-full">
            <h2>Hobby</h2>
            <p className="text-mauve11">Best for small and personal projects</p>
          </div>
          <Checkbox
            checked={value === "hobby"}
            name="plan"
            value="hobby"
            onClick={() => updateForm("hobby")}
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
    </div>
  );
}
