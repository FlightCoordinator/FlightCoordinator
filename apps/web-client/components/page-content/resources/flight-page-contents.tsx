"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { FlightSheet } from "@/components/sheets/flight-sheet";

import { useFlightsQuery } from "@/hooks/resources/flight-hooks";

import { useFlightColumns } from "@/hooks/column-hooks/use-flight-columns";

const FlightPageContents = () => {
  const { isLoading: isFlightQueryLoading, error: flightQueryError, data: flights } = useFlightsQuery();

  const { flightColumns, flightColumnsVisibilities } = useFlightColumns();

  return (
    <DataTable
      columns={flightColumns}
      data={(flights && flights.data) ?? []}
      createSheet={<FlightSheet />}
      visibilities={flightColumnsVisibilities}
      isLoading={isFlightQueryLoading}
      isError={flightQueryError}
      isNotFound={!flights || !flights.data}
    />
  );
};

export { FlightPageContents };
