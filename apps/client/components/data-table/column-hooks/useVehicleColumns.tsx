"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";

import { useToast } from "@/hooks/interface/use-toast";
import useVehicleDeleteMutation from "@/hooks/resource/vehicle/useVehicleDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import VehicleSheet from "../sheets/VehicleSheet";

const useVehicleColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: vehicleDeleteMutation, error: vehicleDeleteError } = useVehicleDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await vehicleDeleteMutation({ id: id });
    if (!response.isSuccess || vehicleDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const vehicleColumns = React.useMemo<ColumnDef<DataTransfer.VehicleDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.VehicleDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "type",
        header: ({ column }) => <ColumnHeader column={column} title="Type" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem("GroundVehicleType", row.original.type as unknown as keyof typeof Enums.GroundVehicleType)
                .label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "vehicleCode",
        header: ({ column }) => <ColumnHeader column={column} title="Vehicle Code" />,
        cell: ({ row }) => <NoWrapCell>{row.original.vehicleCode}</NoWrapCell>,
      },
      {
        accessorKey: "capacity",
        header: ({ column }) => <ColumnHeader column={column} title="Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.capacity}</NoWrapCell>,
      },
      {
        accessorKey: "availability",
        header: ({ column }) => <ColumnHeader column={column} title="Availability" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "GroundVehicleAvailability",
                row.original.availability as unknown as keyof typeof Enums.GroundVehicleAvailability,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "maintenanceDue",
        header: ({ column }) => <ColumnHeader column={column} title="Orientation" />,
        cell: ({ row }) => <NoWrapCell>{dayjs(row.original.maintenanceDue).format("DD MMM YYYY")}</NoWrapCell>,
      },
      {
        accessorKey: "airportId",
        header: ({ column }) => <ColumnHeader column={column} title="Airport Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.airportId}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <VehicleSheet vehicle={row.original} />
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
  const vehicleColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      length: true,
      width: true,
      surfaceType: true,
      maxWeightCapacity: true,
      orientation: true,
      airportId: true,
    }),
    [],
  );
  return { vehicleColumns, vehicleColumnsVisibilities };
};

export default useVehicleColumns;
