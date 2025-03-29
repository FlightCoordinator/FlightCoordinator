import React from "react";

import { ColumnDef, flexRender, Table as ReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../base-ui/table";
import ErrorOverlay from "./overlays/ErrorOverlay";
import LoadingOverlay from "./overlays/LoadingOverlay";
import NotFoundOverlay from "./overlays/NotFoundOverlay";

interface DataTableContentProps<TData, TValue> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  isError: Error | null;
  isNotFound: boolean;
}

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
    <ErrorOverlay />;
  }
  if (isNotFound || data.length === 0 || data.length < 1) {
    <NotFoundOverlay />;
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
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
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

export default DataTableContent;
