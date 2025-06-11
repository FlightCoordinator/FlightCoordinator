"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as ReactTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/base-ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base-ui/table";

import { ColumnToggle } from "@/components/data-table/partials/column-toggle";
import { ErrorOverlay, LoadingOverlay, NotFoundOverlay } from "@/components/data-table/partials/overlays";
import { Pagination } from "@/components/data-table/partials/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createSheet: React.ReactNode;
  visibilities: VisibilityState;
  isLoading: boolean;
  isError: Error | null;
  isNotFound: boolean;
}

interface DataTableContentProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
    getSortedRowModel: getSortedRowModel(),
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
        <div className="flex flex-row items-center justify-center space-x-2">
          <ColumnToggle table={table} />
          <Input
            value={globalFilter}
            onChange={(event) => table.setGlobalFilter(String(event.target.value))}
            placeholder="Type to filter..."
            className="w-[20rem]"
          />
        </div>
        {createSheet}
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

function DataTableContent<TData, TValue>({
  table,
  columns,
  data,
  isLoading = false,
  isError = null,
  isNotFound = false,
}: DataTableContentProps<TData, TValue>) {
  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (isError) {
    return <ErrorOverlay />;
  }
  if (isNotFound || data.length === 0 || data.length < 1) {
    return <NotFoundOverlay />;
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TableHead key={header.id} className={index === headerGroup.headers.length - 1 ? "text-right" : ""}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getSortedRowModel().rows.length ? (
          table.getSortedRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell, index) => (
                <TableCell key={cell.id} className={index === row.getVisibleCells().length - 1 ? "text-right" : ""}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-[30px]">
              <div className="flex flex-col items-center justify-center gap-0.5">
                <span className="font-semibold tracking-tight">Not found</span>
                <span className="text-sm text-muted-foreground">We couldn&apos;t find any data with given filters</span>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { DataTable };
