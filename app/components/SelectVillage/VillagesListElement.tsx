"use client";
import { Village } from "@/db/schema";
import AlertModal from "@/ui/AlertModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import RemoveVillageForm from "../forms/RemoveVillageForm";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function VillagesListElement({
  village,
  userId,
  canDelete,
}: {
  village: Village;
  userId: string;
  canDelete: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { village: villageName } = useParams();

  const smartPathname = (newPath: string) =>
    pathname.replace(villageName as string, newPath);

  return (
    <li key={village.id} className="justify-between flex items-center">
      <Link
        className={`p-2 peer rounded w-full text-left relative hover:bg-mauve4 ${
          !canDelete ? "pointer-events-none bg-mauve4" : ""
        }`}
        href={smartPathname(village.name)}
      >
        {village.name}
      </Link>

      {canDelete && (
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
