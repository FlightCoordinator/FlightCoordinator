"use client";

import React from "react";

import useFlightColumns from "@/components/data-table/column-hooks/useFlightColumns";
import DataTable from "@/components/data-table/DataTable";
import FlightSheet from "@/components/data-table/sheets/FlightSheet";

import useFlightAllQuery from "@/hooks/resource/flight/useFlightAllQuery";

const FlightPage = () => {
  const { isLoading: isFlightQueryLoading, error: flightQueryError, data: flight } = useFlightAllQuery();

  const { flightColumns, flightColumnsVisibilities } = useFlightColumns();

  return (
    <DataTable
      columns={flightColumns}
      data={(flight && flight.data) ?? []}
      createSheet={<FlightSheet />}
      visibilities={flightColumnsVisibilities}
      isLoading={isFlightQueryLoading}
      isError={flightQueryError}
      isNotFound={!flight || !flight.data}
    />
  );
};

export default FlightPage;
