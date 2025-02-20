"use client";

import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { config } from "@/shared/appConfig";

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
    <Auth0Provider domain={config.AUTH0.DOMAIN} clientId={config.AUTH0.CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default Providers;
