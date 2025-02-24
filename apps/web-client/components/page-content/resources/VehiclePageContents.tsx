"use client";

import React from "react";

import useVehicleColumns from "@/components/data-table/column-hooks/useVehicleColumns";
import DataTable from "@/components/data-table/DataTable";
import VehicleSheet from "@/components/data-table/sheets/VehicleSheet";

import useVehicleAllQuery from "@/hooks/resource/vehicle/useVehicleAllQuery";

const VehiclePageContents = () => {
  const { isLoading: isVehicleQueryLoading, error: vehicleQueryError, data: vehicle } = useVehicleAllQuery();

  const { vehicleColumns, vehicleColumnsVisibilities } = useVehicleColumns();

  return (
    <DataTable
      columns={vehicleColumns}
      data={(vehicle && vehicle.data) ?? []}
      createSheet={<VehicleSheet />}
      visibilities={vehicleColumnsVisibilities}
      isLoading={isVehicleQueryLoading}
      isError={vehicleQueryError}
      isNotFound={!vehicle || !vehicle.data}
    />
  );
};

export default VehiclePageContents;
