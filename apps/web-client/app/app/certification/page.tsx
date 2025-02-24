import React from "react";

import { Metadata } from "next";

import CertificationPageContents from "@/components/page-content/resources/CertificationPageContents";

export const metadata: Metadata = {
  title: "Certifications",
};

const CertificationPage = () => {
  return <CertificationPageContents />;
};

export default CertificationPage;
