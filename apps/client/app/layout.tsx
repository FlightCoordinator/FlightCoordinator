import React from "react";

import Providers from "@/components/Providers";
import Sidebar from "@/components/sidebar/Sidebar";

import "@/shared/styles/globals.css";

import GlobalTypes from "@/types/globals";

const RootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <Sidebar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
