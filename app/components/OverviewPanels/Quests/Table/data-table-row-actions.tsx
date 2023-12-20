"use client";
import { Row } from "@tanstack/react-table";
import Dropdown from "@/ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import ShowMenuItem from "@/app/components/QuestItem/ShowMenuItem";
import EditMenuItem from "@/app/components/QuestItem/EditMenuItem";
import { Quest } from "@/db/schema";
import removeQuest from "@/app/actions/removeQuestAction";
import RemoveMenuItem from "@/app/components/QuestItem/RemoveMenuItem";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const quest = row.original as Quest;

  return (
    <Dropdown
      side="left"
      trigger={
        <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve3 active:bg-mauve2 data-[state=open]:bg-mauve3">
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      }
      items={[
        { id: "show", element: <ShowMenuItem quest={quest} /> },
        { id: "edit", element: <EditMenuItem quest={quest} /> },
        {
          id: "delete",
          element: <RemoveMenuItem quest={quest} />,
        },
      ]}
    />
  );
}
