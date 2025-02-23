"use client";

import React from "react";

import MainSidebar from "@/components/sidebar/MainSidebar";

import GlobalTypes from "@/types/globals";

const AppRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <>
      <MainSidebar />
      <main className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)]">{children}</main>
    </>
  );
};

export default AppRootLayout;
