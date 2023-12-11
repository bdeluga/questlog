import { Village } from "@/db/schema";
import AlertModal from "@/ui/AlertModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import RemoveVillageForm from "../forms/RemoveVillageForm";
import selectVillageAction from "@/app/actions/selectVillageAction";

export default function VillagesListElement({
  village,
  selectedVillage,
  handleClick,
  userId,
}: {
  village: Village;
  selectedVillage: string;
  handleClick: (village: Village) => void;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li key={village.id} className="justify-between flex items-center">
      <form
        className="p-2 peer rounded w-full text-left relative hover:bg-mauve4"
        action={() => selectVillageAction(village.id, userId)}
      >
        <button
          className="w-full text-left "
          onClick={() => handleClick(village)}
        >
          {village.name}
        </button>
      </form>
      {selectedVillage !== village.id && (
        <AlertModal
          open={open}
          onOpenChange={setOpen}
          asChild
          trigger={
            <button className="text-mauve11 opacity-0 peer-hover:opacity-100 hover:text-mauve12 hover:opacity-100 duration-150 transition-colors  absolute right-4">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          }
          title={`Remove ${village.name}?`}
          description="This action cannot be undone. This will permanently delete this village and it's data from our servers."
          confirmAction={
            <RemoveVillageForm
              villageId={village.id}
              onSuccess={() => setOpen(false)}
            />
          }
        />
      )}
    </li>
  );
}
