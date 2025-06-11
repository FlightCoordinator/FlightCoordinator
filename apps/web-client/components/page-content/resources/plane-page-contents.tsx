"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { PlaneSheet } from "@/components/sheets/plane-sheet";

import { usePlanesQuery } from "@/hooks/resources/plane-hooks";

import { usePlaneColumns } from "@/hooks/column-hooks/use-plane-columns";

const PlanePageContents = () => {
  const { isLoading: isPlaneQueryLoading, error: planeQueryError, data: plane } = usePlanesQuery();

  const { planeColumns, planeColumnsVisibilities } = usePlaneColumns();

  return (
    <DataTable
      columns={planeColumns}
      data={(plane && plane.data) ?? []}
      createSheet={<PlaneSheet />}
      visibilities={planeColumnsVisibilities}
      isLoading={isPlaneQueryLoading}
      isError={planeQueryError}
      isNotFound={!plane || !plane.data}
    />
  );
};

export { PlanePageContents };
