"use client";

import React from "react";

import useFlightColumns from "@/components/data-table/column-hooks/useFlightColumns";
import DataTable from "@/components/data-table/DataTable";
import FlightSheet from "@/components/data-table/sheets/FlightSheet";

import useFlightAllQuery from "@/hooks/resource/flight/useFlightAllQuery";

const FlightPageContents = () => {
  const { isLoading: isFlightQueryLoading, error: flightQueryError, data: flights } = useFlightAllQuery();

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

export default FlightPageContents;
