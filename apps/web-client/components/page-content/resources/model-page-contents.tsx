"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { ModelSheet } from "@/components/sheets/model-sheet";

import { useModelsQuery } from "@/hooks/resources/model-hooks";

import { useModelColumns } from "@/hooks/column-hooks/use-model-columns";

const ModelPageContents = () => {
  const { isLoading: isModelQueryLoading, error: modelQueryError, data: model } = useModelsQuery();

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

export { ModelPageContents };
