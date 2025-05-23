import React from "react";

import { Metadata } from "next";

import FlightPlanPageContents from "@/components/page-content/resources/FlightPlanPageContents";

export const metadata: Metadata = {
  title: "Models",
};

const FlightPlanPage = () => {
  return <FlightPlanPageContents />;
};

export default FlightPlanPage;
