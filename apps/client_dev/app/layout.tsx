import React from "react";

import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";

import "@/shared/styles/globals.css";

import GlobalTypes from "@/types/globals";

const RootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <Sidebar />
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
