"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { TaxiwaySheet } from "@/components/sheets/taxiway-sheet";

import { useTaxiwaysQuery } from "@/hooks/resources/taxiway-hooks";

import { useTaxiwayColumns } from "@/hooks/column-hooks/use-taxiway-columns";

const TaxiwayPageContents = () => {
  const { isLoading: isTaxiwayQueryLoading, error: taxiwayQueryError, data: taxiway } = useTaxiwaysQuery();

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

export { TaxiwayPageContents };
