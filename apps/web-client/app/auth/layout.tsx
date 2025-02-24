import React from "react";

import AuthValidator from "@/components/AuthValidator";

import GlobalTypes from "@/types/globals";

const AuthRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <AuthValidator globalRoute>
      <section className="w-full h-dvh flex items-center justify-center">{children}</section>
    </AuthValidator>
  );
};

export default AuthRootLayout;
