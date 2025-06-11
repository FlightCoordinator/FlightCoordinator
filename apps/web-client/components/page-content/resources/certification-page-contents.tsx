"use client";

import React from "react";

import { DataTable } from "@/components/data-table";

import { CertificationSheet } from "@/components/sheets/certification-sheet";

import { useCertificationsQuery } from "@/hooks/resources/certification-hooks";

import { useCertificationColumns } from "@/hooks/column-hooks/use-certification-columns";

const CertificationPageContents = () => {
  const {
    isLoading: isCertificationQueryLoading,
    error: certificationQueryError,
    data: certifications,
  } = useCertificationsQuery();

  const { certificationColumns, certificationColumnsVisibilities } = useCertificationColumns();

  return (
    <DataTable
      columns={certificationColumns}
      data={(certifications && certifications.data) ?? []}
      createSheet={<CertificationSheet />}
      visibilities={certificationColumnsVisibilities}
      isLoading={isCertificationQueryLoading}
      isError={certificationQueryError}
      isNotFound={!certifications || !certifications.data}
    />
  );
};

export { CertificationPageContents };
