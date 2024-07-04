"use client";
import Modal from "@/ui/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddVillageForm from "../forms/AddVillageForm";

export default function AddVillageModal({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      asChild
      title="Create new village"
      description="Add another village, and switch between them any time"
      trigger={
        <button className="p-2 rounded w-full flex justify-between items-center hover:bg-mauve4">
          Create village <FontAwesomeIcon icon={faPlus} />
        </button>
      }
    >
      <AddVillageForm onSuccess={() => setOpen(false)} />
    </Modal>
  );
}
