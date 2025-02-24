import React from "react";

import { Metadata } from "next";

import RunwayPageContents from "@/components/page-content/resources/RunwayPageContents";

export const metadata: Metadata = {
  title: "Runways",
};

const RunwayPage = () => {
  return <RunwayPageContents />;
};

export default RunwayPage;
