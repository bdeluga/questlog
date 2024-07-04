"use client";
import completeQuestAction from "@/app/actions/completeQuestAction";
import { Quest } from "@/db/schema";
import AlertModal from "@/ui/AlertModal";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CompleteQuestForm from "../forms/CompleteQuestForm";

export default function CompleteQuestItem({ quest }: { quest: Quest }) {
  const [open, setOpen] = useState(false);
  return (
    <AlertModal
      open={open}
      onOpenChange={setOpen}
      asChild
      trigger={
        <button className="p-2 flex w-full gap-4 items-center justify-between rounded hover:bg-mauve3">
          Complete <FontAwesomeIcon icon={faSave} />
        </button>
      }
      title={`Complete quest #${quest.number}`}
      description="By pressing 'Complete' you will archive quest and receive reward exp."
      confirmAction={
        <CompleteQuestForm quest={quest} onSuccess={() => setOpen(false)} />
      }
    />
  );
}
