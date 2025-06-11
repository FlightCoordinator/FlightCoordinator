"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { toast } from "sonner";

import { ColumnHeader } from "@/components/data-table/partials/column-header";
import { getSelectColumn } from "@/components/data-table/partials/select-column";

import { NoWrapCell } from "@/components/data-table/data-display/no-wrap-cell";

import { FlightSheet } from "@/components/sheets/flight-sheet";

import { DeleteResource } from "@/components/dialogs/delete-dialog";

import { useFlightDeleteMutation } from "@/hooks/resources/flight-hooks";

import type { DataTransfer } from "@/types/dataTransfer";

const useFlightColumns = () => {
  const { mutateAsync: flightDeleteMutation, error: flightDeleteError } = useFlightDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await flightDeleteMutation({ id: id });
    if (!response.isSuccess || flightDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const flightColumns = React.useMemo<ColumnDef<DataTransfer.FlightDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.FlightDTO>(),
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-start">
            <FlightSheet flight={row.original} />
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
        accessorKey: "passengerCount",
        header: ({ column }) => <ColumnHeader column={column} title="Passenger Count" />,
        cell: ({ row }) => <NoWrapCell>{row.original.passengerCount}</NoWrapCell>,
      },
      {
        accessorKey: "cargoWeight",
        header: ({ column }) => <ColumnHeader column={column} title="Cargo Weight" />,
        cell: ({ row }) => <NoWrapCell>{row.original.cargoWeight} lbs</NoWrapCell>,
      },
      {
        accessorKey: "originAirportId",
        header: ({ column }) => <ColumnHeader column={column} title="Origin Airport Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.originAirportId}</NoWrapCell>,
      },
      {
        accessorKey: "destinationAirportId",
        header: ({ column }) => <ColumnHeader column={column} title="Destination Airport Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.destinationAirportId}</NoWrapCell>,
      },
      {
        accessorKey: "distance",
        header: ({ column }) => <ColumnHeader column={column} title="Distance" />,
        cell: ({ row }) => <NoWrapCell>{row.original.distance} nm</NoWrapCell>,
      },
      {
        accessorKey: "estimatedTakeoffTime",
        header: ({ column }) => <ColumnHeader column={column} title="Estimated Takeoff Time" />,
        cell: ({ row }) => <NoWrapCell>{row.original.estimatedTakeoffTime}</NoWrapCell>,
      },
      {
        accessorKey: "estimatedLandingTime",
        header: ({ column }) => <ColumnHeader column={column} title="Estimated Landing Time" />,
        cell: ({ row }) => <NoWrapCell>{row.original.estimatedLandingTime}</NoWrapCell>,
      },
      {
        accessorKey: "estimatedFlightDuration",
        header: ({ column }) => <ColumnHeader column={column} title="Estimated Flight Duration" />,
        cell: ({ row }) => <NoWrapCell>{row.original.estimatedFlightDuration} mins</NoWrapCell>,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const flightColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      runwayNumber: true,
      airportId: true,
      length: true,
      width: true,
      surfaceType: true,
      maxWeightCapacity: true,
      hasMarkings: true,
      hasLighting: true,
      hasILS: true,
      hasSafetyArea: true,
      visualApproachAid: true,
      altitude: true,
      status: true,
      crosswindLimit: true,
    }),
    [],
  );
  return { flightColumns, flightColumnsVisibilities };
};

export { useFlightColumns };
