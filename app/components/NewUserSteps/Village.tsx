"use client";
import AddVillageForm from "@/app/components/forms/AddVillageForm";
import { Village } from "@/db/schema";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

interface Props {
  updateForm: (plan: Village["name"]) => void;
  value: string;
}

export default function Village({ updateForm, value }: Props) {
  return (
    <div className="flex flex-col font-bold justify-center items-center">
      <div className="w-full h-48 flex justify-center items-center">
        <div>
          <label htmlFor="village" className="text-lg text-mauve10">
            Village name
          </label>
          <input
            id="village"
            className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 `}
            placeholder="e.g. Lockwood Village"
            value={value}
            name="name"
            onChange={(e) => updateForm(e.target.value)}
          />
          <span className="text-sm text-mauve11 mt-2">
            <FontAwesomeIcon icon={faTriangleExclamation} /> Mercenaries will
            populate your village later.
          </span>
        </div>
      </div>
    </div>
  );
}
