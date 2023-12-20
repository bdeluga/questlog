"use client";

import { Table } from "@tanstack/react-table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faQuestionCircle,
  faCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="placeholder:text-mauve11 p-0.5 bg-transparent outline-none pl-2 w-[150px] lg:w-[250px] border border-mauve4 rounded-md "
        />

        {isFiltered && (
          <button
            className="flex gap-1 items-center rounded  p-0.5 "
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <FontAwesomeIcon icon={faClose} className="" />
          </button>
        )}
      </div>
    </div>
  );
}
