"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useToast } from "@/hooks/interface/use-toast";
import useRunwayDeleteMutation from "@/hooks/resource/runway/useRunwayDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dto";

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
    return;
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
        accessorKey: "length",
        header: ({ column }) => <ColumnHeader column={column} title="Length" />,
        cell: ({ row }) => <NoWrapCell>{row.original.length}</NoWrapCell>,
      },
      {
        accessorKey: "surfaceType",
        header: ({ column }) => <ColumnHeader column={column} title="Width" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "RunwaySurfaceType",
                row.original.surfaceType as unknown as keyof typeof Enums.RunwaySurfaceType,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "maxWeightCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Max Weight Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxWeightCapacity}</NoWrapCell>,
      },
      {
        accessorKey: "orientation",
        header: ({ column }) => <ColumnHeader column={column} title="Orientation" />,
        cell: ({ row }) => <NoWrapCell>{row.original.orientation}</NoWrapCell>,
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
