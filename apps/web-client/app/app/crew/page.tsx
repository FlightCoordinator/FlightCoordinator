import React from "react";

import { Metadata } from "next";

import { CrewPageContents } from "@/components/page-content/resources/crew-page-contents";

export const metadata: Metadata = {
  title: "Crew Members",
};

const CrewPage = () => {
  return <CrewPageContents />;
};

export default CrewPage;
