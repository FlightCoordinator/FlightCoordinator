"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";

import { useToast } from "@/hooks/interface/use-toast";
import useFlightDeleteMutation from "@/hooks/resource/flight/useFlightDeleteMutation";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import FlightSheet from "../sheets/FlightSheet";

const useFlightColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: flightDeleteMutation, error: flightDeleteError } = useFlightDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await flightDeleteMutation({ id: id });
    if (!response.isSuccess || flightDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const flightColumns = React.useMemo<ColumnDef<DataTransfer.FlightDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.FlightDTO>(),
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
      },
      {
        accessorKey: "flightRouteId",
        header: ({ column }) => <ColumnHeader column={column} title="Flight Route Id" />,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <FlightSheet flight={row.original} />
            <Button variant="ghost" size="icon" onClick={async () => await handleDeleteSubmit(row.original.id)}>
              <Trash2 />
            </Button>
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const flightColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      passengerCount: true,
      flightRouteId: true,
    }),
    [],
  );
  return { flightColumns, flightColumnsVisibilities };
};

export default useFlightColumns;
