import { Table } from "@tanstack/react-table";

export function getVisibleColumnCount<TData>(table: Table<TData>): number {
  return table
    .getAllColumns()
    .filter((column) => column.getIsVisible() === true && column.id !== "select" && column.id !== "actions").length;
}

export function getAllColumnCount<TData>(table: Table<TData>): number {
  return table.getAllColumns().filter((column) => column.id !== "select" && column.id !== "actions").length;
}
