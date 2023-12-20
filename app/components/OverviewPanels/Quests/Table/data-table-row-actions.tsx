"use client";
import { Row } from "@tanstack/react-table";
import Dropdown from "@/ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import ShowMenuItem from "@/app/components/QuestItem/ShowMenuItem";
import EditMenuItem from "@/app/components/QuestItem/EditMenuItem";
import { Quest } from "@/db/schema";
import removeQuest from "@/app/actions/removeQuestAction";

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
      asChild
      trigger={
        <button className="p-1 w-8 h-8 rounded flex justify-center items-center hover:bg-mauve2 active:bg-mauve2 data-[state=open]:bg-mauve2">
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      }
    >
      <div className="rounded-md p-2  w-48 min-w-[8rem] bg-mauve2 border border-mauve4 ">
        <ul>
          <li>
            <ShowMenuItem quest={quest} />
          </li>
          <EditMenuItem quest={quest} />
          <li>
            <form action={removeQuest.bind(null, quest.id)}>
              <button className="p-2 flex w-full gap-4 justify-between items-center rounded hover:bg-mauve3">
                Delete task <FontAwesomeIcon icon={faTrash} />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
}
