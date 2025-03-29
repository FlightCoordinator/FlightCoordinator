"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useToast } from "@/hooks/interface/useToast";
import useTaxiwayDeleteMutation from "@/hooks/resource/taxiway/useTaxiwayDeleteMutation";

import Utils from "@/shared/utils";

import DataTransfer from "@/types/dataTransfer";

import BoolDisplay from "../partials/BoolDisplay";
import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import TaxiwaySheet from "../sheets/TaxiwaySheet";

const useTaxiwayColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: taxiwayDeleteMutation, error: taxiwayDeleteError } = useTaxiwayDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await taxiwayDeleteMutation({ id: id });
    if (!response.isSuccess || taxiwayDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const taxiwayColumns = React.useMemo<ColumnDef<DataTransfer.TaxiwayDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.TaxiwayDTO>(),
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
        accessorKey: "airportId",
        header: ({ column }) => <ColumnHeader column={column} title="Airport Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.airportId}</NoWrapCell>,
      },
      {
        accessorKey: "loadCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Load Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.loadCapacity} lbs</NoWrapCell>,
      },
      {
        accessorKey: "hasHoldingPoint",
        header: ({ column }) => <ColumnHeader column={column} title="Has Holding Point" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasHoldingPoint} />
            {Utils.boolToLabel(String(row.original.hasHoldingPoint))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasHighSpeedExit",
        header: ({ column }) => <ColumnHeader column={column} title="Has High Speed Exit" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasHoldingPoint} />
            {Utils.boolToLabel(String(row.original.hasHighSpeedExit))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "width",
        header: ({ column }) => <ColumnHeader column={column} title="Width" />,
        cell: ({ row }) => <NoWrapCell>{row.original.width} ft</NoWrapCell>,
      },
      {
        accessorKey: "length",
        header: ({ column }) => <ColumnHeader column={column} title="Length" />,
        cell: ({ row }) => <NoWrapCell>{row.original.length} ft</NoWrapCell>,
      },
      {
        accessorKey: "maxTurningRadius",
        header: ({ column }) => <ColumnHeader column={column} title="Max Turning Radius" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxTurningRadius} ft</NoWrapCell>,
      },
      {
        accessorKey: "maxWeightCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Max Weight Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxWeightCapacity} lbs</NoWrapCell>,
      },
      {
        accessorKey: "hasLighting",
        header: ({ column }) => <ColumnHeader column={column} title="Has Lighting" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasLighting} />
            {Utils.boolToLabel(String(row.original.hasLighting))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasSignage",
        header: ({ column }) => <ColumnHeader column={column} title="Has Signage" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasSignage} />
            {Utils.boolToLabel(String(row.original.hasSignage))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "connectedRunwayId",
        header: ({ column }) => <ColumnHeader column={column} title="Connected Runway Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.connectedRunwayId}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <TaxiwaySheet taxiway={row.original} />
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
  const taxiwayColumnsVisibilities = React.useMemo<VisibilityState>(
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
  return { taxiwayColumns, taxiwayColumnsVisibilities };
};

export default useTaxiwayColumns;
