"use client";

import React from "react";

import useFlightPlanColumns from "@/components/data-table/column-hooks/useFlightPlanColumns";
import DataTable from "@/components/data-table/DataTable";
import FlightPlanDialog from "@/components/data-table/dialogs/FlightPlanDialog";

import useAirportAllQuery from "@/hooks/resource/airport/useAirportAllQuery";
import useFlightPlanAllQuery from "@/hooks/resource/flight-plan/useFlightPlanAllQuery";
import useFlightAllQuery from "@/hooks/resource/flight/useFlightAllQuery";

const FlightPlanPageContents = () => {
  const {
    isLoading: isFlightPlanQueryLoading,
    error: flightPlanQueryError,
    data: flightPlans,
  } = useFlightPlanAllQuery();

  const { isLoading: isFlightQueryLoading, error: flightQueryError, data: flights } = useFlightAllQuery();
  const { isLoading: isAirportQueryLoading, error: airportQueryError, data: airports } = useAirportAllQuery();

  const { flightPlanColumns, flightPlanColumnsVisibilities } = useFlightPlanColumns();

  return (
    <DataTable
      columns={flightPlanColumns}
      data={(flightPlans && flightPlans.data) ?? []}
      createSheet={
        <FlightPlanDialog
          flightDetails={
            flights && flights.data && airports && airports.data
              ? flights.data.map((flight) => {
                  const originAirportDetails = airports.data?.find((airport) => airport.id === flight.originAirportId);
                  const destinationAirportDetails = airports.data?.find(
                    (airport) => airport.id === flight.destinationAirportId,
                  );
                  return {
                    id: flight.id,
                    originAirport: {
                      id: originAirportDetails!.id,
                      iataCode: originAirportDetails!.iataCode,
                      name: originAirportDetails!.name,
                      countryCode: originAirportDetails!.countryCode,
                    },
                    destinationAirport: {
                      id: destinationAirportDetails!.id,
                      iataCode: destinationAirportDetails!.iataCode,
                      name: destinationAirportDetails!.name,
                      countryCode: destinationAirportDetails!.countryCode,
                    },
                  };
                })
              : []
          }
        />
      }
      visibilities={flightPlanColumnsVisibilities}
      isLoading={isFlightPlanQueryLoading || isFlightQueryLoading || isAirportQueryLoading}
      isError={flightPlanQueryError || flightQueryError || airportQueryError}
      isNotFound={!flightPlans || !flightPlans.data}
    />
  );
};

export default FlightPlanPageContents;
