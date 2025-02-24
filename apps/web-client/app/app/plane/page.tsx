import React from "react";

import { Metadata } from "next";

import PlanePageContents from "@/components/page-content/resources/PlanePageContents";

export const metadata: Metadata = {
  title: "Planes",
};

const PlanePage = () => {
  return <PlanePageContents />;
};

export default PlanePage;
