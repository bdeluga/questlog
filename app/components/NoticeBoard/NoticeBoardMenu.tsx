"use client";
import { Quest, Village } from "@/db/schema";
import Modal from "@/ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddQuestForm from "../forms/AddQuestForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function NoticeBoardMenu({
  village,
}: {
  village: Village & { quests: Quest[] };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <Modal
        open={open}
        onOpenChange={setOpen}
        asChild
        trigger={
          <button className="inline-flex w-fit gap-2 items-center px-4 py-2 rounded bg-mauve3 m-2">
            Add new Quest <FontAwesomeIcon icon={faPlus} />
          </button>
        }
        title="Add new Quest"
        description="Add a new quest to your journal! Provide needed details, and embark on your journey!"
      >
        <AddQuestForm
          villagLevel={village?.level!}
          expNeeded={village?.expNeeded!}
          villageName={village.name}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
