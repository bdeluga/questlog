"use client";
import AlertModal from "@/ui/AlertModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import RemoveVillageForm from "../forms/RemoveVillageForm";

export default function RemoveVillageModal({
  villageName,
  villageId,
}: {
  villageName: string;
  villageId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <AlertModal
      open={open}
      onOpenChange={setOpen}
      asChild
      trigger={
        <button className="text-mauve11 opacity-0 peer-hover:opacity-100 hover:text-mauve12 hover:opacity-100 duration-150 transition-colors  absolute right-4">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      }
      title={`Remove ${villageName}?`}
      description="This action cannot be undone. This will permanently delete this village and it's data from our servers."
      confirmAction={
        <RemoveVillageForm
          villageId={villageId}
          onSuccess={() => setOpen(false)}
        />
      }
    />
  );
}
