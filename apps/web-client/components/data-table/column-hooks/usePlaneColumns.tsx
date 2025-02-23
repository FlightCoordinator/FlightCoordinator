"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";

import { useToast } from "@/hooks/interface/use-toast";
import usePlaneDeleteMutation from "@/hooks/resource/plane/usePlaneDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import PlaneSheet from "../sheets/PlaneSheet";

const usePlaneColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: planeDeleteMutation, error: planeDeleteError } = usePlaneDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await planeDeleteMutation({ id: id });
    if (!response.isSuccess || planeDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const planeColumns = React.useMemo<ColumnDef<DataTransfer.PlaneDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.PlaneDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "registrationNumber",
        header: ({ column }) => <ColumnHeader column={column} title="Registration Number" />,
        cell: ({ row }) => <NoWrapCell>{row.original.registrationNumber}</NoWrapCell>,
      },
      {
        accessorKey: "passengerCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Passenger Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.passengerCapacity}</NoWrapCell>,
      },
      {
        accessorKey: "fuelEfficiency",
        header: ({ column }) => <ColumnHeader column={column} title="Fuel Efficiency" />,
        cell: ({ row }) => <NoWrapCell>{row.original.fuelEfficiency}</NoWrapCell>,
      },
      {
        accessorKey: "maxFlightRange",
        header: ({ column }) => <ColumnHeader column={column} title="Max Flight Range" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxFlightRange}</NoWrapCell>,
      },
      {
        accessorKey: "lastMaintenance",
        header: ({ column }) => <ColumnHeader column={column} title="Last Maintenance" />,
        cell: ({ row }) => <NoWrapCell>{dayjs(row.original.lastMaintenance).format("DD MMM YYYY")}</NoWrapCell>,
      },
      {
        accessorKey: "totalFlightHours",
        header: ({ column }) => <ColumnHeader column={column} title="Total Flight Hours" />,
        cell: ({ row }) => <NoWrapCell>{row.original.totalFlightHours}</NoWrapCell>,
      },
      {
        accessorKey: "maxTakeoffWeight",
        header: ({ column }) => <ColumnHeader column={column} title="Max Takeoff Weight" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxTakeoffWeight}</NoWrapCell>,
      },
      {
        accessorKey: "shortestRunwayLengthRequired",
        header: ({ column }) => <ColumnHeader column={column} title="Shortest Runway Length Required" />,
        cell: ({ row }) => <NoWrapCell>{row.original.shortestRunwayLengthRequired}</NoWrapCell>,
      },
      {
        accessorKey: "shortestRunwayWidthRequired",
        header: ({ column }) => <ColumnHeader column={column} title="Shortest Runway Width Required" />,
        cell: ({ row }) => <NoWrapCell>{row.original.shortestRunwayWidthRequired}</NoWrapCell>,
      },
      {
        accessorKey: "planeStatus",
        header: ({ column }) => <ColumnHeader column={column} title="Status" />,
        cell: ({ cell }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "PlaneAvailability",
                cell.row.original.planeStatus as unknown as keyof typeof Enums.PlaneAvailability,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "currentLocationId",
        header: ({ column }) => <ColumnHeader column={column} title="Current Location Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.currentLocationId}</NoWrapCell>,
      },
      {
        accessorKey: "aircraftOperator",
        header: ({ column }) => <ColumnHeader column={column} title="Aircraft Operator" />,
        cell: ({ row }) => <NoWrapCell>{row.original.aircraftOperator}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <PlaneSheet plane={row.original} />
            <DeleteResource onClick={async () => await handleDeleteSubmit(row.original.id)} />
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const planeColumnsVisibilities = React.useMemo<VisibilityState>(
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
      planeStatus: true,
      currentLocationId: true,
      aircraftOperator: true,
    }),
    [],
  );
  return { planeColumns, planeColumnsVisibilities };
};

export default usePlaneColumns;
