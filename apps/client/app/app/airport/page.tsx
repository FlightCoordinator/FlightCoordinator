"use client";

import React from "react";

import useAirportColumns from "@/components/data-table/column-hooks/useAirportColumns";
import DataTable from "@/components/data-table/DataTable";
import AirportSheet from "@/components/data-table/sheets/AirportSheet";

import useAirportAllQuery from "@/hooks/resource/airport/useAirportAllQuery";

const AirportPage = () => {
  const { isLoading: isAirportQueryLoading, error: airportQueryError, data: airports } = useAirportAllQuery();

  const { airportColumns, airportColumnsVisibilities } = useAirportColumns();

  return (
    <DataTable
      columns={airportColumns}
      data={(airports && airports.data) ?? []}
      createSheet={<AirportSheet />}
      visibilities={airportColumnsVisibilities}
      isLoading={isAirportQueryLoading}
      isError={airportQueryError}
      isNotFound={!airports || !airports.data}
    />
  );
};

export default AirportPage;
