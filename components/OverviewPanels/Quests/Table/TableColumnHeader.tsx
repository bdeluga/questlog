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

export default function TableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className="">{title}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Dropdown
        trigger={
          <button className=" h-8 data-[state=open]:bg-mauve4 rounded">
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
        items={[
          {
            id: "asc",
            element: (
              <button
                className="flex items-center gap-2 p-1 outline-none hover:bg-mauve4 rounded"
                onClick={() => column.toggleSorting(false)}
              >
                <FontAwesomeIcon icon={faArrowUp} />
                Asc
              </button>
            ),
          },
          {
            id: "desc",
            element: (
              <button
                className="flex items-center gap-2 p-1 outline-none hover:bg-mauve4 rounded"
                onClick={() => column.toggleSorting(true)}
              >
                <FontAwesomeIcon icon={faArrowDown} />
                Desc
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
