"use client";

import React from "react";

import useRouteColumns from "@/components/data-table/column-hooks/useRouteColumns";
import DataTable from "@/components/data-table/DataTable";
import RouteSheet from "@/components/data-table/sheets/RouteSheet";

import useRouteAllQuery from "@/hooks/resource/route/useRouteAllQuery";

const RoutePage = () => {
  const { isLoading: isRouteQueryLoading, error: routeQueryError, data: route } = useRouteAllQuery();

  const { routeColumns, routeColumnsVisibilities } = useRouteColumns();

  return (
    <DataTable
      columns={routeColumns}
      data={(route && route.data) ?? []}
      createSheet={<RouteSheet />}
      visibilities={routeColumnsVisibilities}
      isLoading={isRouteQueryLoading}
      isError={routeQueryError}
      isNotFound={!route || !route.data}
    />
  );
};

export default RoutePage;
