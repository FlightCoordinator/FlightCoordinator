"use client";

import React from "react";

import { SidebarProvider } from "@/components/base-ui/sidebar";
import MainSidebar from "@/components/sidebar/MainSidebar";

import GlobalTypes from "@/types/globals";

const AppRootLayout = ({ children }: GlobalTypes.BaseWrapperProps) => {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="w-[calc(100vw-17rem)] min-w-[calc(100vw-17rem)] max-w-[calc(100vw-17rem)]">{children}</main>
    </SidebarProvider>
  );
};

export default AppRootLayout;
