import React from "react";

import { Metadata } from "next";

import { FlightPlanPageContents } from "@/components/page-content/resources/flight-plan-page-contents";

export const metadata: Metadata = {
  title: "Flight Plans",
};

const FlightPlanPage = () => {
  return <FlightPlanPageContents />;
};

export default FlightPlanPage;
