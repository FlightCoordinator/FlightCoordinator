import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { toast } from "sonner";

import { ColumnHeader } from "@/components/data-table/partials/column-header";
import { getSelectColumn } from "@/components/data-table/partials/select-column";

import { IdDropdown } from "@/components/data-table/data-display/id-dropdown";
import { NoWrapCell } from "@/components/data-table/data-display/no-wrap-cell";

import { DeleteResource } from "@/components/dialogs/delete-dialog";

import { useFlightPlanDeleteMutation } from "@/hooks/resources/flight-plan-hooks";

import type { DataTransfer } from "@/types/dataTransfer";

const useFlightPlanColumns = () => {
  const { mutateAsync: flightPlanDeleteMutation, error: flightPlanDeleteError } = useFlightPlanDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await flightPlanDeleteMutation({ id: id });
    if (!response.isSuccess || flightPlanDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const flightPlanColumns = React.useMemo<ColumnDef<DataTransfer.FlightPlanDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.FlightPlanDTO>(),
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-start">
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
        accessorKey: "basedOnFlightId",
        header: ({ column }) => <ColumnHeader column={column} title="Based on Flight ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.basedOnFlightId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedPlaneId",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Plane ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.selectedPlaneId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedTakeoffRunwayId",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Takeoff Runway ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.selectedTakeoffRunwayId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedLandingRunwayId",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Landing Runway ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.selectedLandingRunwayId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedTakeoffTaxiwayId",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Takeoff Taxiway ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.selectedTakeoffTaxiwayId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedLandingTaxiwayId",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Landing Taxiway ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.selectedLandingTaxiwayId}</NoWrapCell>,
      },
      {
        accessorKey: "selectedCrewMemberIds",
        header: ({ column }) => <ColumnHeader column={column} title="Selected Crew Member ID" />,
        cell: ({ row }) => <IdDropdown ids={row.original.selectedCrewMemberIds} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const flightPlanColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      basedOnFlightId: true,
      selectedPlaneId: true,
      selectedTakeoffRunwayId: true,
      selectedLandingRunwayId: true,
      selectedTakeoffTaxiwayId: true,
      selectedLandingTaxiwayId: true,
      selectedCrewMemberIds: true,
    }),
    [],
  );
  return { flightPlanColumns, flightPlanColumnsVisibilities };
};

export { useFlightPlanColumns };
