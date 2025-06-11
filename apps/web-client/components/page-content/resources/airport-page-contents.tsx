"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { AirportSheet } from "@/components/sheets/airport-sheet";

import { useAirportsQuery } from "@/hooks/resources/airport-hooks";

import { useAirportColumns } from "@/hooks/column-hooks/use-airport-columns";

const AirportPageContents = () => {
  const { isLoading: isAirportQueryLoading, error: airportQueryError, data: airports } = useAirportsQuery();

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

export { AirportPageContents };
