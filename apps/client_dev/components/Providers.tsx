"use client";

import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalTypes from "@/types/globals";

import { SidebarProvider } from "./base-ui/sidebar";

const Providers = ({ children }: GlobalTypes.BaseWrapperProps) => {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 3, retryDelay: 2000 },
    },
  });

  return (
    <Auth0Provider domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!} clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default Providers;
