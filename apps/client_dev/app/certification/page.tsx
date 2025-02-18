"use client";

import React from "react";

import DataTable from "@/components/data-table/DataTable";

import useCertificationAllQuery from "@/hooks/resource/certification/useCertificationAllQuery";

const CertificationPage = () => {
  const {
    isLoading: isCertificationQueryLoading,
    error: certificationQueryError,
    data: certifications,
  } = useCertificationAllQuery();

  // TODO

  return (
    <DataTable
      columns={certificationColumns}
      data={(certifications && certifications.data) ?? []}
      createDialog={<CertificationDialog />}
      visibilities={certificationColumnsVisibilities}
      isLoading={isCertificationQueryLoading}
      isError={certificationQueryError}
      isNotFound={!certifications || !certifications.data}
    />
  );
};

export default CertificationPage;
