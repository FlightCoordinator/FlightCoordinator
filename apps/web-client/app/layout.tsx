import React from "react";

import { Metadata } from "next";

import Providers from "@/components/Providers";

import "@/shared/styles/globals.css";

import GlobalTypes from "@/types/globals";

export const metadata: Metadata = {
  title: {
    template: "%s - FlightCoordinator",
    default: "FlightCoordinator",
  },
};

const RootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <html suppressHydrationWarning>
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
