"use client";

import addVillageAction from "@/app/actions/addVillageAction";
import useToast from "@/app/hooks/useToast";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react";
import { z } from "zod";

export default function AddVillageForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const toast = useToast();
  const [error, setError] = useState("");
  const clientAction = async (formData: FormData) => {
    const VillageSchema = z.object({
      name: z.string().trim().min(1, "This field is required."),
    });

    const newVillage = {
      name: formData.get("name"),
    };
    const response = VillageSchema.safeParse(newVillage);
    if (!response.success) {
      return setError(response.error.issues[0].message);
    }

    const result = await addVillageAction(formData);
    if (result?.error) {
      toast.notify({
        title: "Error",
        description: result.error,
        variant: "danger",
      });
    } else {
      toast.notify({
        title: "Success",
        description: "Village added",
        variant: "success",
      });
      onSuccess?.();
    }
  };

  return (
    <form className="mt-4" action={clientAction}>
      <label htmlFor="village">Name</label>
      <input
        id="village"
        className={`w-full p-2 rounded-md mt-1 focus:ring disabled:opacity-50 disabled:pointer-events-none ring-mauve5 bg-mauve4 ${
          error ? "border-2 border-red9" : ""
        }`}
        placeholder="e.g. Lockwood Village"
        name="name"
        onFocus={() => setError("")}
      />
      {error && (
        <span className="text-red9">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {error}
        </span>
      )}
      <div className="flex justify-end">
        <button className="border active:scale-105  rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-4">
          Add
        </button>
      </div>
    </form>
  );
}
