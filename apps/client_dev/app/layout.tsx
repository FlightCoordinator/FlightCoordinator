import React from "react";

import GlobalTypes from "@/types/globals";

const RootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
