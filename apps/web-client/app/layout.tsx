import React from "react";

import Providers from "@/components/Providers";

import "@/shared/styles/globals.css";

import GlobalTypes from "@/types/globals";

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
