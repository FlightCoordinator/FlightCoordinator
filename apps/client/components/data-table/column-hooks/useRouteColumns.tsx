"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";

import { useToast } from "@/hooks/interface/use-toast";
import useRouteDeleteMutation from "@/hooks/resource/route/useRouteDeleteMutation";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import RouteSheet from "../sheets/RouteSheet";

const useRouteColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: routeDeleteMutation, error: routeDeleteError } = useRouteDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await routeDeleteMutation({ id: id });
    if (!response.isSuccess || routeDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const routeColumns = React.useMemo<ColumnDef<DataTransfer.RouteDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.RouteDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
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
        cell: ({ row }) => <NoWrapCell>{row.original.distance}</NoWrapCell>,
      },
      {
        accessorKey: "estimatedTime",
        header: ({ column }) => <ColumnHeader column={column} title="Estimated Time" />,
        cell: ({ row }) => <NoWrapCell>{row.original.estimatedTime}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <RouteSheet route={row.original} />
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
  const routeColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      model: true,
      registrationNumber: true,
      passengerCapacity: true,
      fuelEfficiency: true,
      maxFlightRange: true,
      lastMaintenance: true,
      totalFlightHours: true,
      maxTakeoffWeight: true,
      shortestRunwayLengthRequired: true,
      shortestRunwayWidthRequired: true,
      routeStatus: true,
      currentLocationId: true,
      aircraftOperator: true,
    }),
    [],
  );
  return { routeColumns, routeColumnsVisibilities };
};

export default useRouteColumns;
