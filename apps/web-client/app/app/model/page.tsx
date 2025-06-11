import React from "react";

import { Metadata } from "next";

import { ModelPageContents } from "@/components/page-content/resources/model-page-contents";

export const metadata: Metadata = {
  title: "Models",
};

const ModelPage = () => {
  return <ModelPageContents />;
};

export default ModelPage;
