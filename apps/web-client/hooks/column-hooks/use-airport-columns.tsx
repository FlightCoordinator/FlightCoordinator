"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { toast } from "sonner";

import { ColumnHeader } from "@/components/data-table/partials/column-header";
import { getSelectColumn } from "@/components/data-table/partials/select-column";

import { IdDropdown } from "@/components/data-table/data-display/id-dropdown";
import { NoWrapCell } from "@/components/data-table/data-display/no-wrap-cell";

import { AirportSheet } from "@/components/sheets/airport-sheet";

import { DeleteResource } from "@/components/dialogs/delete-dialog";

import { useAirportDeleteMutation } from "@/hooks/resources/airport-hooks";

import { getSelectItem } from "@/shared/constants/selectItems";

import { Enums } from "@/shared/enum/enums";

import type { DataTransfer } from "@/types/dataTransfer";

const useAirportColumns = () => {
  const { mutateAsync: airportDeleteMutation, error: airportDeleteError } = useAirportDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await airportDeleteMutation({ id: id });
    if (!response.isSuccess || airportDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const airportColumns = React.useMemo<ColumnDef<DataTransfer.AirportDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.AirportDTO>(),
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-start">
            <AirportSheet airport={row.original} />
            <DeleteResource onClick={async () => await handleDeleteSubmit(row.original.id)} />
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => <ColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <NoWrapCell>{row.original.name}</NoWrapCell>,
      },
      {
        accessorKey: "iataCode",
        header: ({ column }) => <ColumnHeader column={column} title="IATA Code" />,
        cell: ({ row }) => <NoWrapCell>{row.original.iataCode}</NoWrapCell>,
      },
      {
        accessorKey: "icaoCode",
        header: ({ column }) => <ColumnHeader column={column} title="ICAO Code" />,
        cell: ({ row }) => <NoWrapCell>{row.original.icaoCode}</NoWrapCell>,
      },
      {
        accessorKey: "countryCode",
        header: ({ column }) => <ColumnHeader column={column} title="Country Code" />,
        cell: ({ row }) => <NoWrapCell>{row.original.countryCode}</NoWrapCell>,
      },
      {
        accessorKey: "type",
        header: ({ column }) => <ColumnHeader column={column} title="Airport Type" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("AirportType", row.original.type as unknown as keyof typeof Enums.AirportType).label}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "operationStartTime",
        header: ({ column }) => <ColumnHeader column={column} title="Operation Start Time" />,
        cell: ({ row }) => <NoWrapCell>{row.original.operationStartTime}</NoWrapCell>,
      },
      {
        accessorKey: "operationStopTime",
        header: ({ column }) => <ColumnHeader column={column} title="Operation Stop Time" />,
        cell: ({ row }) => <NoWrapCell>{row.original.operationStopTime}</NoWrapCell>,
      },
      {
        accessorKey: "elevation",
        header: ({ column }) => <ColumnHeader column={column} title="Elevation" />,
        cell: ({ row }) => <NoWrapCell>{row.original.elevation} ft</NoWrapCell>,
      },
      {
        accessorKey: "slope",
        header: ({ column }) => <ColumnHeader column={column} title="Slope" />,
        cell: ({ row }) => <NoWrapCell>{row.original.slope} %</NoWrapCell>,
      },
      {
        accessorKey: "possibleNoiseCategory",
        header: ({ column }) => <ColumnHeader column={column} title="Possible Noise Category" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "NoiseCategory",
                row.original.possibleNoiseCategory as unknown as keyof typeof Enums.NoiseCategory,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "runwayIds",
        header: ({ column }) => <ColumnHeader column={column} title="Runway Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.runwayIds} />,
      },
      {
        accessorKey: "taxiwayIds",
        header: ({ column }) => <ColumnHeader column={column} title="Taxiway Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.taxiwayIds} />,
      },
      {
        accessorKey: "planesPresentIds",
        header: ({ column }) => <ColumnHeader column={column} title="Planes Present Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.planesPresentIds} />,
      },
      {
        accessorKey: "flightFromAirportIds",
        header: ({ column }) => <ColumnHeader column={column} title="Flight From Airport Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.flightFromAirportIds} />,
      },
      {
        accessorKey: "flightToAirportIds",
        header: ({ column }) => <ColumnHeader column={column} title="Flight To Airport Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.flightToAirportIds} />,
      },
      {
        accessorKey: "crewMembersPresentIds",
        header: ({ column }) => <ColumnHeader column={column} title="Crew Members Present Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.crewMembersPresentIds} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const airportColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      name: true,
      iataCode: true,
      icaoCode: true,
      countryCode: true,
      type: true,
      operationStartTime: true,
      operationStopTime: true,
      elevation: true,
      slope: true,
      possibleNoiseCategory: true,
      runwayIds: false,
      taxiwayIds: false,
      planesPresentIds: false,
      flightFromAirportIds: false,
      flightToAirportIds: false,
      crewMembersPresentIds: false,
    }),
    [],
  );
  return { airportColumns, airportColumnsVisibilities };
};

export { useAirportColumns };
