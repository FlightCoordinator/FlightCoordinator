"use client";

import React from "react";

import useRunwayColumns from "@/components/data-table/column-hooks/useRunwayColumns";
import DataTable from "@/components/data-table/DataTable";
import RunwaySheet from "@/components/data-table/sheets/RunwaySheet";

import useRunwayAllQuery from "@/hooks/resource/runway/useRunwayAllQuery";

const RunwayPageContents = () => {
  const { isLoading: isRunwayQueryLoading, error: runwayQueryError, data: runway } = useRunwayAllQuery();

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

export default RunwayPageContents;
