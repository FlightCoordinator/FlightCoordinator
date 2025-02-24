"use client";

import React from "react";

import usePlaneColumns from "@/components/data-table/column-hooks/usePlaneColumns";
import DataTable from "@/components/data-table/DataTable";
import PlaneSheet from "@/components/data-table/sheets/PlaneSheet";

import usePlaneAllQuery from "@/hooks/resource/plane/usePlaneAllQuery";

const PlanePageContents = () => {
  const { isLoading: isPlaneQueryLoading, error: planeQueryError, data: plane } = usePlaneAllQuery();

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

export default PlanePageContents;
