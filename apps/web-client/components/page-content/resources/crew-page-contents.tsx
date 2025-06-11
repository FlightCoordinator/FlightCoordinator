"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { CrewSheet } from "@/components/sheets/crew-sheet";

import { useCrewMembersQuery } from "@/hooks/resources/crew-hooks";

import { useCrewColumns } from "@/hooks/column-hooks/use-crew-columns";

const CrewPageContents = () => {
  const { isLoading: isCrewQueryLoading, error: crewQueryError, data: crew } = useCrewMembersQuery();

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

export { CrewPageContents };
