"use client";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import { Checkbox } from "@/components/base-ui/checkbox";
import AirportSheet from "@/components/data-table/sheets/AirportDialog";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";

export const airportColumns: ColumnDef<DataTransfer.AirportDTO>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        style={{ verticalAlign: "middle" }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        style={{ verticalAlign: "middle" }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "iataCode",
    header: ({ column }) => <ColumnHeader column={column} title="IATA Code" />,
  },
  {
    accessorKey: "icaoCode",
    header: ({ column }) => <ColumnHeader column={column} title="ICAO Code" />,
  },
  {
    accessorKey: "countryCode",
    header: ({ column }) => <ColumnHeader column={column} title="Country Code" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <ColumnHeader column={column} title="Country Code" />,
  },
  {
    accessorKey: "runwayIds",
    header: ({ column }) => <ColumnHeader column={column} title="Runway Ids" />,
  },
  {
    accessorKey: "vehiclesPresentIds",
    header: ({ column }) => <ColumnHeader column={column} title="Vehicles Present Ids" />,
  },
  {
    accessorKey: "planesPresentIds",
    header: ({ column }) => <ColumnHeader column={column} title="Planes Present Ids" />,
  },
  {
    accessorKey: "routesOriginatingFromAirportIds",
    header: ({ column }) => <ColumnHeader column={column} title="Route Originating for Airport Ids" />,
  },
  {
    accessorKey: "routesDestinedForAirportIds",
    header: ({ column }) => <ColumnHeader column={column} title="Route Destined for Airport Ids" />,
  },
  {
    accessorKey: "crewMembersPresentIds",
    header: ({ column }) => <ColumnHeader column={column} title="Crew Members Present Ids" />,
  },
  {
    id: "actions",
    header: () => <span className="select-none hover:text-foreground">Actions</span>,
    cell: ({ row }) => (
      <>
        <AirportSheet airport={row.original} />
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </>
    ),
    enableHiding: false,
    enableSorting: false,
  },
];

export const airportColumnsVisibilities: VisibilityState = {
  id: true,
  name: true,
  iataCode: true,
  icaoCode: true,
  countryCode: true,
  type: true,
  runwayIds: false,
  vehiclesPresentIds: false,
  planesPresentIds: false,
  routesOriginatingFromAirportIds: false,
  routesDestinedForAirportIds: false,
  crewMembersPresentIds: false,
};
