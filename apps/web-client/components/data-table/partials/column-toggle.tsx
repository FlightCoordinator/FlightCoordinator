import React from "react";

import { Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base-ui/dropdown-menu";

interface ColumnToggleProps<TData> {
  table: Table<TData>;
}

export function getVisibleColumnCount<TData>(table: Table<TData>): number {
  return table
    .getAllColumns()
    .filter((column) => column.getIsVisible() === true && column.id !== "select" && column.id !== "actions").length;
}

export function getAllColumnCount<TData>(table: Table<TData>): number {
  return table.getAllColumns().filter((column) => column.id !== "select" && column.id !== "actions").length;
}

function ColumnToggle<TData>({ table }: ColumnToggleProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto hidden lg:flex">
          <Columns3 /> Toggle Columns
          <div className="tracking-tight flex flex-row items-center justify-center gap-[1.25px]">
            <span>(</span>
            <span>{getVisibleColumnCount(table)}</span>
            <span>/</span>
            <span>{getAllColumnCount(table)}</span>
            <span>)</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}>
              {column.id === "_id" ? "ID" : column.id.replaceAll("_", " ")}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={table.getIsAllColumnsVisible()}
          onCheckedChange={(value) => table.toggleAllColumnsVisible(!!value)}>
          Toggle All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ColumnToggle };
