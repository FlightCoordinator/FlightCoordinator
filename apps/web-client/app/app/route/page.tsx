import React from "react";

import { Metadata } from "next";

import RoutePageContents from "@/components/page-content/resources/RoutePageContents";

export const metadata: Metadata = {
  title: "Routes",
};

const RoutePage = () => {
  return <RoutePageContents />;
};

export default RoutePage;
