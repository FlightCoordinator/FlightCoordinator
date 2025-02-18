"use client";

import React from "react";

import { airportColumns, airportColumnsVisibilities } from "@/components/data-table/columns/AirportColumns";
import DataTable from "@/components/data-table/DataTable";
import AirportSheet from "@/components/data-table/sheets/AirportDialog";

import useAirportAllQuery from "@/hooks/resource/airport/useAirportAllQuery";

const AirportPage = () => {
  const { isLoading: isAirportQueryLoading, error: airportQueryError, data: airports } = useAirportAllQuery();

  return (
    <DataTable
      columns={airportColumns}
      data={(airports && airports.data) ?? []}
      createDialog={<AirportSheet />}
      visibilities={airportColumnsVisibilities}
      isLoading={isAirportQueryLoading}
      isError={airportQueryError}
      isNotFound={!airports || !airports.data}
    />
  );
};

export default AirportPage;
