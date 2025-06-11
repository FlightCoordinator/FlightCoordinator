import React from "react";

import type { GlobalTypes } from "@/types/globals";

const AuthRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return <section className="w-full h-dvh flex items-center justify-center">{children}</section>;
};

export default AuthRootLayout;
