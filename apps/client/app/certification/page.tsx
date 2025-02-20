"use client";

import React from "react";

import useCertificationColumns from "@/components/data-table/column-hooks/useCertificationColumns";
import DataTable from "@/components/data-table/DataTable";
import CertificationSheet from "@/components/data-table/sheets/CertificationSheet";

import useCertificationAllQuery from "@/hooks/resource/certification/useCertificationAllQuery";

const CertificationPage = () => {
  const {
    isLoading: isCertificationQueryLoading,
    error: certificationQueryError,
    data: certifications,
  } = useCertificationAllQuery();

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

export default CertificationPage;
