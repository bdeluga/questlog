"use client";
import React, { FormEvent, useState } from "react";
import { db } from "@/db";
import Modal from "@/ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import getFormData from "@/utils/getFormData";

interface Props {
  id: string;
}

export default function VillageFormMenu({ id }: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormData(event.currentTarget);

    await fetch("api/village", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId: id,
      }),
    });
  };

  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      asChild
      trigger={
        <button className="py-2 px-4 flex w-full justify-between items-center hover:bg-mauve5">
          Create new village
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
      title="Create village"
      description="Create your own village. You will be able to upgrade it with each level you get."
    >
      <form className="mt-4" onSubmit={handleSubmit}>
        <label htmlFor="village">Name</label>
        <input
          id="village"
          className="w-full p-2 rounded-md mt-1 focus:ring ring-mauve5 bg-mauve4"
          placeholder="e.g. Lockwood Village"
          name="name"
        />
        <div className="flex justify-end">
          <button className="border active:scale-105  rounded-md border-orange11 hover:text-mauve1 duration-200 hover:bg-orange11 px-4 py-2 mt-4">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
