"use client";

import React from "react";

import useTaxiwayColumns from "@/components/data-table/column-hooks/useTaxiwayColumns";
import DataTable from "@/components/data-table/DataTable";
import TaxiwaySheet from "@/components/data-table/sheets/TaxiwaySheet";

import useTaxiwayAllQuery from "@/hooks/resource/taxiway/useTaxiwayAllQuery";

const TaxiwayPageContents = () => {
  const { isLoading: isTaxiwayQueryLoading, error: taxiwayQueryError, data: taxiway } = useTaxiwayAllQuery();

  const { taxiwayColumns, taxiwayColumnsVisibilities } = useTaxiwayColumns();

  return (
    <DataTable
      columns={taxiwayColumns}
      data={(taxiway && taxiway.data) ?? []}
      createSheet={<TaxiwaySheet />}
      visibilities={taxiwayColumnsVisibilities}
      isLoading={isTaxiwayQueryLoading}
      isError={taxiwayQueryError}
      isNotFound={!taxiway || !taxiway.data}
    />
  );
};

export default TaxiwayPageContents;
