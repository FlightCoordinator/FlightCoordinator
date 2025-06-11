import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/base-ui/checkbox";

function getSelectColumn<T>(): ColumnDef<T> {
  const selectColumn: ColumnDef<T> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        style={{ verticalAlign: "middle", marginRight: "10px" }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        style={{ verticalAlign: "middle", marginRight: "10px" }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
  return selectColumn;
}

export { getSelectColumn };
