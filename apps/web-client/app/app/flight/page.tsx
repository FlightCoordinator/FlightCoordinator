import React from "react";

import { Metadata } from "next";

import FlightPageContents from "@/components/page-content/resources/FlightPageContents";

export const metadata: Metadata = {
  title: "Flights",
};

const FlightPage = () => {
  return <FlightPageContents />;
};

export default FlightPage;
