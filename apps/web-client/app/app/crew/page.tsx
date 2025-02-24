import React from "react";

import { Metadata } from "next";

import CrewPageContents from "@/components/page-content/resources/CrewPageContents";

export const metadata: Metadata = {
  title: "Crew Members",
};

const CrewPage = () => {
  return <CrewPageContents />;
};

export default CrewPage;
