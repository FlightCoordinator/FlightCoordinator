"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";

import { useToast } from "@/hooks/interface/useToast";
import usePlaneDeleteMutation from "@/hooks/resource/plane/usePlaneDeleteMutation";

import { dateFormat } from "@/shared/constants/dateFormat";
import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dataTransfer";

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
        accessorKey: "modelId",
        header: ({ column }) => <ColumnHeader column={column} title="Model Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.modelId}</NoWrapCell>,
      },
      {
        accessorKey: "tailNumber",
        header: ({ column }) => <ColumnHeader column={column} title="Tail Number" />,
        cell: ({ row }) => <NoWrapCell>{row.original.tailNumber}</NoWrapCell>,
      },
      {
        accessorKey: "cyclesSinceLastMaintenance",
        header: ({ column }) => <ColumnHeader column={column} title="Cycles Since Last Maintenance" />,
        cell: ({ row }) => <NoWrapCell>{row.original.cyclesSinceLastMaintenance}</NoWrapCell>,
      },
      {
        accessorKey: "retirementDate",
        header: ({ column }) => <ColumnHeader column={column} title="Retirement Date" />,
        cell: ({ row }) => <NoWrapCell>{dayjs(row.original.retirementDate).format(dateFormat)}</NoWrapCell>,
      },
      {
        accessorKey: "engineHours",
        header: ({ column }) => <ColumnHeader column={column} title="Engine Hours" />,
        cell: ({ row }) => <NoWrapCell>{row.original.engineHours} h</NoWrapCell>,
      },
      {
        accessorKey: "currentWearLevel",
        header: ({ column }) => <ColumnHeader column={column} title="Current Wear Level" />,
        cell: ({ row }) => <NoWrapCell>{row.original.currentWearLevel} %</NoWrapCell>,
      },
      {
        accessorKey: "totalFlightHours",
        header: ({ column }) => <ColumnHeader column={column} title="Total Flight Hours" />,
        cell: ({ row }) => <NoWrapCell>{row.original.totalFlightHours} h</NoWrapCell>,
      },
      {
        accessorKey: "fuelAmount",
        header: ({ column }) => <ColumnHeader column={column} title="Fuel Amount" />,
        cell: ({ row }) => <NoWrapCell>{row.original.fuelAmount} gal</NoWrapCell>,
      },
      {
        accessorKey: "planeStatus",
        header: ({ column }) => <ColumnHeader column={column} title="Plane Status" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("PlaneStatus", row.original.planeStatus as unknown as keyof typeof Enums.PlaneStatus).label}
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
      modelId: true,
      tailNumber: true,
      nextMaintenanceDate: true,
      cyclesSinceLastMaintenance: true,
      retirementDate: true,
      engineHours: true,
      currentWearLevel: true,
      totalFlightHours: true,
      fuelAmount: true,
      planeStatus: true,
      currentLocationId: true,
      aircraftOperator: true,
    }),
    [],
  );
  return { planeColumns, planeColumnsVisibilities };
};

export default usePlaneColumns;
