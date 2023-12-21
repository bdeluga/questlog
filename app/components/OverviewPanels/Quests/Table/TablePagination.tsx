import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between mt-2 p-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>

          <select
            className="px-2 py-1 bg-transparent border border-mauve4 rounded-md"
            value={table.getState().pagination.pageSize.toString()}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((value) => (
              <option className="bg-mauve2 " key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex text-sm items-center space-x-2">
          <button
            className="hidden w-8 h-8 rounded-md hover:bg-mauve4 disabled:pointer-events-none lg:block"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button
            className="w-8 h-8 rounded-md hover:bg-mauve4 disabled:pointer-events-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="w-8 h-8 rounded-md hover:bg-mauve4 disabled:pointer-events-none aspect-square"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button
            className="hidden w-8 h-8 rounded-md hover:bg-mauve4 disabled:pointer-events-none lg:block"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
