import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useToast } from "@/hooks/interface/useToast";
import useFlightPlanDeleteMutation from "@/hooks/resource/flight-plan/useFlightPlanDeleteMutation";

import DataTransfer from "@/types/dataTransfer";

import IdDropdown from "../data-components/IdDropdown";
import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";

const useFlightPlanColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: flightPlanDeleteMutation, error: flightPlanDeleteError } = useFlightPlanDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await flightPlanDeleteMutation({ id: id });
    if (!response.isSuccess || flightPlanDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
  };

  const flightPlanColumns = React.useMemo<ColumnDef<DataTransfer.FlightPlanDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.FlightPlanDTO>(),
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
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
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

export default useFlightPlanColumns;
