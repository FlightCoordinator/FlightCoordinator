"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

import GlobalTypes from "@/types/globals";

import { SidebarProvider } from "./base-ui/sidebar";
import { Toaster } from "./base-ui/toaster";

const Providers = ({ children }: GlobalTypes.BaseWrapperProps) => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 3, retryDelay: 2000 },
    },
  });

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
