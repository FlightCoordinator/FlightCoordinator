import React from "react";

import { Metadata } from "next";

import { TaxiwayPageContents } from "@/components/page-content/resources/taxiway-page-contents";

export const metadata: Metadata = {
  title: "Taxiways",
};

const TaxiwayPage = () => {
  return <TaxiwayPageContents />;
};

export default TaxiwayPage;
