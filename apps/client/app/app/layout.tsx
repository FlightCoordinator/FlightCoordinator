"use client";

import React from "react";

import Sidebar from "@/components/sidebar/Sidebar";

import GlobalTypes from "@/types/globals";

const AppRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  // TODO auth logic here
  const isAuthenticated: boolean = false;

  if (isAuthenticated) {
    return (
      <>
        <Sidebar />
        <main className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)]">{children}</main>
      </>
    );
  }

  // For fallback only, the app shouldn't reach here
  return null;
};

export default AppRootLayout;
