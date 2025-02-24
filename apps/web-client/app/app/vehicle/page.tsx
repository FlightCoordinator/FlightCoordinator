import React from "react";

import { Metadata } from "next";

import VehiclePageContents from "@/components/page-content/resources/VehiclePageContents";

export const metadata: Metadata = {
  title: "Ground Vehicles",
};

const VehiclePage = () => {
  return <VehiclePageContents />;
};

export default VehiclePage;
