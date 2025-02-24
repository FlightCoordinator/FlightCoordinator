import React from "react";

import { Metadata } from "next";

import AirportPageContents from "@/components/page-content/resources/AirportPageContents";

export const metadata: Metadata = {
  title: "Airports",
};

const AirportPage = () => {
  return <AirportPageContents />;
};

export default AirportPage;
