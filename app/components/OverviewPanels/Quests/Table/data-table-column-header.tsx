import Dropdown from "@/ui/Dropdown";
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className="">{title}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Dropdown
        asChild
        trigger={
          <button className=" h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <FontAwesomeIcon icon={faArrowDown} className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <FontAwesomeIcon icon={faArrowUp} className="ml-2 h-4 w-4" />
            ) : (
              <FontAwesomeIcon icon={faSort} className="ml-2 h-4 w-4" />
            )}
          </button>
        }
      >
        <ul className="space-y-2 border border-mauve4 bg-mauve2 px-4 py-2 rounded">
          <li className="text-mauve11">
            <button onClick={() => column.toggleSorting(false)}>
              <FontAwesomeIcon icon={faArrowUp} className="mr-2 h-3.5 w-3.5" />
              Asc
            </button>
          </li>
          <li className="text-mauve11">
            <button onClick={() => column.toggleSorting(true)}>
              <FontAwesomeIcon
                icon={faArrowDown}
                className="mr-2 h-3.5 w-3.5"
              />
              Desc
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
