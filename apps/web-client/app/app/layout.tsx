"use client";

import React from "react";

import AuthValidator from "@/components/AuthValidator";
import MainSidebar from "@/components/sidebar/MainSidebar";

import GlobalTypes from "@/types/globals";

const AppRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <AuthValidator>
      <MainSidebar />
      <main className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)]">{children}</main>
    </AuthValidator>
  );
};

export default AppRootLayout;
