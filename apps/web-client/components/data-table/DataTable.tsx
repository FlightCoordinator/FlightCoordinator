"use client";

import React from "react";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table as ReactTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/base-ui/input";

import DataTableContent from "./DataTableContent";
import ColumnToggle from "./partials/ColumnToggle";
import Pagination from "./partials/Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createSheet: React.ReactNode;
  visibilities: VisibilityState;
  isLoading: boolean;
  isError: Error | null;
  isNotFound: boolean;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  createSheet,
  visibilities,
  isLoading = false,
  isError = null,
  isNotFound = false,
}: DataTableProps<TData, TValue>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalFilter, setGlobalFilter] = React.useState<any>([]);

  const table: ReactTable<TData> = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: { globalFilter },
    initialState: {
      columnVisibility: visibilities,
    },
  });

  return (
    <div className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)] min-h-dvh max-h-dvh h-dvh flex flex-1 flex-col items-center justify-start py-4 px-8">
      <section className="w-full flex items-center justify-between pb-4 gap-2">
        {createSheet}
        <div className="flex flex-row items-center justify-center space-x-2">
          <Input
            value={globalFilter}
            onChange={(event) => table.setGlobalFilter(String(event.target.value))}
            placeholder="Type to filter..."
            className="w-[20rem]"
          />
          <ColumnToggle table={table} />
        </div>
      </section>
      <div className="h-[calc(100%-109px)] w-full flex flex-1">
        <DataTableContent
          table={table}
          columns={columns}
          data={data}
          isLoading={isLoading}
          isError={isError}
          isNotFound={isNotFound}
        />
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default DataTable;
