"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { toast } from "sonner";

import useModelDeleteMutation from "@/hooks/resource/model/useModelDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";
import Utils from "@/shared/utils";

import DataTransfer from "@/types/dataTransfer";

import BoolDisplay from "../partials/BoolDisplay";
import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import ModelSheet from "../sheets/ModelSheet";

const useModelColumns = () => {
  const { mutateAsync: modelDeleteMutation, error: modelDeleteError } = useModelDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await modelDeleteMutation({ id: id });
    if (!response.isSuccess || modelDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const modelColumns = React.useMemo<ColumnDef<DataTransfer.ModelDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.ModelDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "manufacturer",
        header: ({ column }) => <ColumnHeader column={column} title="Manufacturer" />,
        cell: ({ row }) => <NoWrapCell>{row.original.manufacturer}</NoWrapCell>,
      },
      {
        accessorKey: "planeIdentifier",
        header: ({ column }) => <ColumnHeader column={column} title="Plane Identifier" />,
        cell: ({ row }) => <NoWrapCell>{row.original.planeIdentifier}</NoWrapCell>,
      },
      {
        accessorKey: "modelName",
        header: ({ column }) => <ColumnHeader column={column} title="Model Name" />,
        cell: ({ row }) => <NoWrapCell>{row.original.modelName}</NoWrapCell>,
      },
      {
        accessorKey: "certifier",
        header: ({ column }) => <ColumnHeader column={column} title="Certifier" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("Certifier", row.original.certifier as unknown as keyof typeof Enums.Certifier).label}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "certificationStatus",
        header: ({ column }) => <ColumnHeader column={column} title="Certification Status" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem(
                "CertificationStatus",
                row.original.certificationStatus as unknown as keyof typeof Enums.CertificationStatus,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "noiseCategory",
        header: ({ column }) => <ColumnHeader column={column} title="Noise Category" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem("NoiseCategory", row.original.noiseCategory as unknown as keyof typeof Enums.NoiseCategory)
                .label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "fuelCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Fuel Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.fuelCapacity} gal</NoWrapCell>,
      },
      {
        accessorKey: "fuelEfficiency",
        header: ({ column }) => <ColumnHeader column={column} title="Fuel Efficiency" />,
        cell: ({ row }) => <NoWrapCell>{row.original.fuelEfficiency} lbs fuel burned per passenger per NM</NoWrapCell>,
      },
      {
        accessorKey: "maxPassengerCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Max Passenger Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxPassengerCapacity}</NoWrapCell>,
      },
      {
        accessorKey: "maxCargoCapacity",
        header: ({ column }) => <ColumnHeader column={column} title="Max Cargo Capacity" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxCargoCapacity} lbs</NoWrapCell>,
      },
      {
        accessorKey: "emptyWeight",
        header: ({ column }) => <ColumnHeader column={column} title="Empty Weight" />,
        cell: ({ row }) => <NoWrapCell>{row.original.emptyWeight} lbs</NoWrapCell>,
      },
      {
        accessorKey: "tailHeight",
        header: ({ column }) => <ColumnHeader column={column} title="Tail Height" />,
        cell: ({ row }) => <NoWrapCell>{row.original.tailHeight} ft</NoWrapCell>,
      },
      {
        accessorKey: "wingspan",
        header: ({ column }) => <ColumnHeader column={column} title="Wing Span" />,
        cell: ({ row }) => <NoWrapCell>{row.original.wingspan} ft</NoWrapCell>,
      },
      {
        accessorKey: "engineType",
        header: ({ column }) => <ColumnHeader column={column} title="Engine Type" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("EngineType", row.original.engineType as unknown as keyof typeof Enums.EngineType).label}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "engineCount",
        header: ({ column }) => <ColumnHeader column={column} title="Engine Count" />,
        cell: ({ row }) => <NoWrapCell>{row.original.engineCount}</NoWrapCell>,
      },
      {
        accessorKey: "thrustPerEngine",
        header: ({ column }) => <ColumnHeader column={column} title="Thrust Per Engine" />,
        cell: ({ row }) => <NoWrapCell>{row.original.thrustPerEngine} lbf</NoWrapCell>,
      },
      {
        accessorKey: "maxCrosswindComp",
        header: ({ column }) => <ColumnHeader column={column} title="Max Crosswind Component" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxCrosswindComp} kt</NoWrapCell>,
      },
      {
        accessorKey: "requiredRunwayLength",
        header: ({ column }) => <ColumnHeader column={column} title="Required Runway Length" />,
        cell: ({ row }) => <NoWrapCell>{row.original.requiredRunwayLength} ft</NoWrapCell>,
      },
      {
        accessorKey: "requiredRunwayWidth",
        header: ({ column }) => <ColumnHeader column={column} title="Required Runway Width" />,
        cell: ({ row }) => <NoWrapCell>{row.original.requiredRunwayWidth} ft</NoWrapCell>,
      },
      {
        accessorKey: "minRotationRadius",
        header: ({ column }) => <ColumnHeader column={column} title="Min Rotation Radius" />,
        cell: ({ row }) => <NoWrapCell>{row.original.minRotationRadius} ft</NoWrapCell>,
      },
      {
        accessorKey: "cruiseSpeed",
        header: ({ column }) => <ColumnHeader column={column} title="Cruise Speed" />,
        cell: ({ row }) => <NoWrapCell>{row.original.cruiseSpeed} kt</NoWrapCell>,
      },
      {
        accessorKey: "maxSpeed",
        header: ({ column }) => <ColumnHeader column={column} title="Max Speed" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxSpeed} kt</NoWrapCell>,
      },
      {
        accessorKey: "stallSpeed",
        header: ({ column }) => <ColumnHeader column={column} title="Stall Speed" />,
        cell: ({ row }) => <NoWrapCell>{row.original.stallSpeed} kt</NoWrapCell>,
      },
      {
        accessorKey: "maxAltitude",
        header: ({ column }) => <ColumnHeader column={column} title="Max Altitude" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxAltitude} ft</NoWrapCell>,
      },
      {
        accessorKey: "climbRate",
        header: ({ column }) => <ColumnHeader column={column} title="Climb Rate" />,
        cell: ({ row }) => <NoWrapCell>{row.original.climbRate} ft/min</NoWrapCell>,
      },
      {
        accessorKey: "descentRate",
        header: ({ column }) => <ColumnHeader column={column} title="Descent Rate" />,
        cell: ({ row }) => <NoWrapCell>{row.original.descentRate} ft/min</NoWrapCell>,
      },
      {
        accessorKey: "maxFlightRange",
        header: ({ column }) => <ColumnHeader column={column} title="Max Flight Range" />,
        cell: ({ row }) => <NoWrapCell>{row.original.maxFlightRange} NM</NoWrapCell>,
      },
      {
        accessorKey: "hasWeatherRadar",
        header: ({ column }) => <ColumnHeader column={column} title="Has Weather Radar" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasWeatherRadar} />
            {Utils.boolToLabel(String(row.original.hasWeatherRadar))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasAutopilot",
        header: ({ column }) => <ColumnHeader column={column} title="Has Autopilot" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasWeatherRadar} />
            {Utils.boolToLabel(String(row.original.hasAutopilot))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasFlyByWire",
        header: ({ column }) => <ColumnHeader column={column} title="Has Fly By Wire" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasWeatherRadar} />
            {Utils.boolToLabel(String(row.original.hasFlyByWire))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "hasFireSupression",
        header: ({ column }) => <ColumnHeader column={column} title="Has Fire Supression" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasWeatherRadar} />
            {Utils.boolToLabel(String(row.original.hasFireSupression))}
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "gpsEnabled",
        header: ({ column }) => <ColumnHeader column={column} title="GPS Enabled" />,
        cell: ({ row }) => (
          <NoWrapCell>
            <BoolDisplay value={row.original.hasWeatherRadar} />
            {Utils.boolToLabel(String(row.original.gpsEnabled))}
          </NoWrapCell>
        ),
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <ModelSheet model={row.original} />
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
  const modelColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      manufacturer: true,
      planeIdentifier: true,
      modelName: true,
      certifier: true,
      certificationStatus: true,
      noiseCategory: true,
      fuelCapacity: true,
      fuelEfficiency: true,
      maxPassengerCapacity: true,
      maxCargoCapacity: true,
      emptyWeight: true,
      tailHeight: true,
      wingspan: true,
      engineType: true,
      engineCount: true,
      thrustPerEngine: true,
      maxCrosswindComp: true,
      requiredRunwayLength: true,
      requiredRunwayWidth: true,
      minRotationRadius: true,
      cruiseSpeed: true,
      maxSpeed: true,
      stallSpeed: true,
      maxAltitude: true,
      climbRate: true,
      descentRate: true,
      maxFlightRange: true,
      hasWeatherRadar: true,
      hasAutopilot: true,
      hasFlyByWire: true,
      hasFireSupression: true,
      gpsEnabled: true,
    }),
    [],
  );
  return { modelColumns, modelColumnsVisibilities };
};

export default useModelColumns;
