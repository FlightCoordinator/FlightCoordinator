"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { FlightPlanDialog } from "@/components/dialogs/flight-plan-create-dialog";

import { useAirportsQuery } from "@/hooks/resources/airport-hooks";
import { useFlightsQuery } from "@/hooks/resources/flight-hooks";
import { useFlightPlansQuery } from "@/hooks/resources/flight-plan-hooks";

import { useFlightPlanColumns } from "@/hooks/column-hooks/use-flight-plan-columns";

const FlightPlanPageContents = () => {
  const { isLoading: isFlightPlanQueryLoading, error: flightPlanQueryError, data: flightPlans } = useFlightPlansQuery();

  const { isLoading: isFlightQueryLoading, error: flightQueryError, data: flights } = useFlightsQuery();
  const { isLoading: isAirportQueryLoading, error: airportQueryError, data: airports } = useAirportsQuery();

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

export { FlightPlanPageContents };
