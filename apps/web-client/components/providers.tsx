"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

import { SidebarProvider } from "@/components/base-ui/sidebar";
import { Toaster } from "@/components/base-ui/sonner";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";

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
        {config.ENVIRONMENT.IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export { Providers };
