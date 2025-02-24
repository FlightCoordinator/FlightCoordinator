"use client";

import React from "react";

import useCrewColumns from "@/components/data-table/column-hooks/useCrewColumns";
import DataTable from "@/components/data-table/DataTable";
import CrewSheet from "@/components/data-table/sheets/CrewSheet";

import useCrewAllQuery from "@/hooks/resource/crew/useCrewAllQuery";

const CrewPageContents = () => {
  const { isLoading: isCrewQueryLoading, error: crewQueryError, data: crew } = useCrewAllQuery();

  const { crewColumns, crewColumnsVisibilities } = useCrewColumns();

  return (
    <DataTable
      columns={crewColumns}
      data={(crew && crew.data) ?? []}
      createSheet={<CrewSheet />}
      visibilities={crewColumnsVisibilities}
      isLoading={isCrewQueryLoading}
      isError={crewQueryError}
      isNotFound={!crew || !crew.data}
    />
  );
};

export default CrewPageContents;
