"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { toast } from "sonner";

import { ColumnHeader } from "@/components/data-table/partials/column-header";
import { getSelectColumn } from "@/components/data-table/partials/select-column";

import { BoolDisplay } from "@/components/data-table/data-display/bool-display";
import { NoWrapCell } from "@/components/data-table/data-display/no-wrap-cell";

import { TaxiwaySheet } from "@/components/sheets/taxiway-sheet";

import { DeleteResource } from "@/components/dialogs/delete-dialog";

import { useTaxiwayDeleteMutation } from "@/hooks/resources/taxiway-hooks";

import { Utils } from "@/shared/utils";

import type { DataTransfer } from "@/types/dataTransfer";

const useTaxiwayColumns = () => {
  const { mutateAsync: taxiwayDeleteMutation, error: taxiwayDeleteError } = useTaxiwayDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await taxiwayDeleteMutation({ id: id });
    if (!response.isSuccess || taxiwayDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const taxiwayColumns = React.useMemo<ColumnDef<DataTransfer.TaxiwayDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.TaxiwayDTO>(),
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-start">
            <TaxiwaySheet taxiway={row.original} />
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

export { useTaxiwayColumns };
