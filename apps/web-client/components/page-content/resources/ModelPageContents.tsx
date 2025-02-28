"use client";

import React from "react";

import useModelColumns from "@/components/data-table/column-hooks/useModelColumns";
import DataTable from "@/components/data-table/DataTable";
import ModelSheet from "@/components/data-table/sheets/ModelSheet";

import useModelAllQuery from "@/hooks/resource/model/useModelAllQuery";

const ModelPageContents = () => {
  const { isLoading: isModelQueryLoading, error: modelQueryError, data: model } = useModelAllQuery();

  const { modelColumns, modelColumnsVisibilities } = useModelColumns();

  return (
    <DataTable
      columns={modelColumns}
      data={(model && model.data) ?? []}
      createSheet={<ModelSheet />}
      visibilities={modelColumnsVisibilities}
      isLoading={isModelQueryLoading}
      isError={modelQueryError}
      isNotFound={!model || !model.data}
    />
  );
};

export default ModelPageContents;
