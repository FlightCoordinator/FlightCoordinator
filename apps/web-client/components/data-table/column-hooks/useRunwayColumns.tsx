"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useToast } from "@/hooks/interface/useToast";
import useRunwayDeleteMutation from "@/hooks/resource/runway/useRunwayDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import Utils from "@/shared/utils";

import DataTransfer from "@/types/dataTransfer";

import BoolDisplay from "../partials/BoolDisplay";
import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import RunwaySheet from "../sheets/RunwaySheet";

const useRunwayColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: runwayDeleteMutation, error: runwayDeleteError } = useRunwayDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await runwayDeleteMutation({ id: id });
    if (!response.isSuccess || runwayDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
  };

  const runwayColumns = React.useMemo<ColumnDef<DataTransfer.RunwayDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.RunwayDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "runwayNumber",
        header: ({ column }) => <ColumnHeader column={column} title="Runway Number" />,
        cell: ({ row }) => <NoWrapCell>{row.original.runwayNumber}</NoWrapCell>,
      },
      {
        accessorKey: "airportId",
        header: ({ column }) => <ColumnHeader column={column} title="Airport Id" />,
        cell: ({ row }) => <NoWrapCell>{row.original.airportId}</NoWrapCell>,
      },
      {
        accessorKey: "length",
        header: ({ column }) => <ColumnHeader column={column} title="Length" />,
        cell: ({ row }) => <NoWrapCell>{row.original.length} ft</NoWrapCell>,
      },
      {
        accessorKey: "width",
        header: ({ column }) => <ColumnHeader column={column} title="Width" />,
        cell: ({ row }) => <NoWrapCell>{row.original.width} ft</NoWrapCell>,
      },
      {
        accessorKey: "surfaceType",
        header: ({ column }) => <ColumnHeader column={column} title="Surface Type" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("SurfaceType", row.original.surfaceType as unknown as keyof typeof Enums.SurfaceType).label}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "maxWeightCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Max Weight Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxWeightCapacity} lbs</NoWrapCell>,
      },
      {
        accessorKey: "hasMarkings",
        header: ({ column }) => <ColumnHeader column={column} title="Has Markings" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasMarkings} />
            {Utils.boolToLabel(String(row.original.hasMarkings))}
          </NoWrapCell>
        ),
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
        accessorKey: "hasILS",
        header: ({ column }) => <ColumnHeader column={column} title="Has ILS" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasILS} />
            {Utils.boolToLabel(String(row.original.hasILS))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasSafetyArea",
        header: ({ column }) => <ColumnHeader column={column} title="Has Safety Area" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasSafetyArea} />
            {Utils.boolToLabel(String(row.original.hasSafetyArea))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "visualApproachAid",
        header: ({ column }) => <ColumnHeader column={column} title="Visual Approach Aid" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "VisualApproachAid",
                row.original.visualApproachAid as unknown as keyof typeof Enums.VisualApproachAid,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "altitude",
        header: ({ column }) => <ColumnHeader column={column} title="Altitude" />,
        cell: ({ row }) => <NoWrapCell>{row.original.altitude} ft</NoWrapCell>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <ColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("RunwayStatus", row.original.status as unknown as keyof typeof Enums.RunwayStatus).label}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "crosswindLimit",
        header: ({ column }) => <ColumnHeader column={column} title="Crosswind Limit" />,
        cell: ({ row }) => <NoWrapCell>{row.original.crosswindLimit} kt</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <RunwaySheet runway={row.original} />
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
  const runwayColumnsVisibilities = React.useMemo<VisibilityState>(
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
  return { runwayColumns, runwayColumnsVisibilities };
};

export default useRunwayColumns;
