import React from "react";

import { Metadata } from "next";

import TaxiwayPageContents from "@/components/page-content/resources/TaxiwayPageContents";

export const metadata: Metadata = {
  title: "Taxiways",
};

const TaxiwayPage = () => {
  return <TaxiwayPageContents />;
};

export default TaxiwayPage;
