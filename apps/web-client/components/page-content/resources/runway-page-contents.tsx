"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { RunwaySheet } from "@/components/sheets/runway-sheet";

import { useRunwaysQuery } from "@/hooks/resources/runway-hooks";

import { useRunwayColumns } from "@/hooks/column-hooks/use-runway-columns";

const RunwayPageContents = () => {
  const { isLoading: isRunwayQueryLoading, error: runwayQueryError, data: runway } = useRunwaysQuery();

  const { runwayColumns, runwayColumnsVisibilities } = useRunwayColumns();

  return (
    <DataTable
      columns={runwayColumns}
      data={(runway && runway.data) ?? []}
      createSheet={<RunwaySheet />}
      visibilities={runwayColumnsVisibilities}
      isLoading={isRunwayQueryLoading}
      isError={runwayQueryError}
      isNotFound={!runway || !runway.data}
    />
  );
};

export { RunwayPageContents };
