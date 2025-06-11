import React from "react";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";

import "@/shared/styles/globals.css";

import type { GlobalTypes } from "@/types/globals";

export const metadata: Metadata = {
  title: {
    template: "%s - FlightCoordinator",
    default: "FlightCoordinator",
  },
};

const RootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
