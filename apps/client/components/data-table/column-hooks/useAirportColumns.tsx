"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";
import AirportSheet from "@/components/data-table/sheets/AirportSheet";

import { useToast } from "@/hooks/interface/use-toast";
import useAirportDeleteMutation from "@/hooks/resource/airport/useAirportDeleteMutation";

import { getLabelValueObject } from "@/shared/utils/enumUtils";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
import IdDropdown from "../partials/IdDropdown";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";

const useAirportColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: airportDeleteMutation, error: airportDeleteError } = useAirportDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await airportDeleteMutation({ id: id });
    if (!response.isSuccess || airportDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const airportColumns = React.useMemo<ColumnDef<DataTransfer.AirportDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.AirportDTO>(),
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
        accessorKey: "iataCode",
        header: ({ column }) => <ColumnHeader column={column} title="IATA Code" />,
      },
      {
        accessorKey: "icaoCode",
        header: ({ column }) => <ColumnHeader column={column} title="ICAO Code" />,
      },
      {
        accessorKey: "countryCode",
        header: ({ column }) => <ColumnHeader column={column} title="Country Code" />,
      },
      {
        accessorKey: "type",
        header: ({ column }) => <ColumnHeader column={column} title="Airport Type" />,
        cell: ({ row }) => getLabelValueObject("AirportType", row.original.type).label,
      },
      {
        accessorKey: "runwayIds",
        header: ({ column }) => <ColumnHeader column={column} title="Runway Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.runwayIds} />,
      },
      {
        accessorKey: "vehiclesPresentIds",
        header: ({ column }) => <ColumnHeader column={column} title="Vehicles Present Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.vehiclesPresentIds} />,
      },
      {
        accessorKey: "planesPresentIds",
        header: ({ column }) => <ColumnHeader column={column} title="Planes Present Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.planesPresentIds} />,
      },
      {
        accessorKey: "routesOriginatingFromAirportIds",
        header: ({ column }) => <ColumnHeader column={column} title="Route Originating for Airport Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.routesOriginatingFromAirportIds} />,
      },
      {
        accessorKey: "routesDestinedForAirportIds",
        header: ({ column }) => <ColumnHeader column={column} title="Route Destined for Airport Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.routesDestinedForAirportIds} />,
      },
      {
        accessorKey: "crewMembersPresentIds",
        header: ({ column }) => <ColumnHeader column={column} title="Crew Members Present Ids" />,
        cell: ({ row }) => <IdDropdown ids={row.original.crewMembersPresentIds} />,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <AirportSheet airport={row.original} />
            <Button variant="ghost" size="icon" onClick={() => handleDeleteSubmit(row.original.id)}>
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
  const airportColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      id: true,
      name: true,
      iataCode: true,
      icaoCode: true,
      countryCode: true,
      type: true,
      runwayIds: false,
      vehiclesPresentIds: false,
      planesPresentIds: false,
      routesOriginatingFromAirportIds: false,
      routesDestinedForAirportIds: false,
      crewMembersPresentIds: false,
    }),
    [],
  );
  return { airportColumns, airportColumnsVisibilities };
};

export default useAirportColumns;
