"use client";

export const hasEnvVars: boolean = !!(
  process.env.NEXT_PUBLIC_SERVER_URL &&
  process.env.NEXT_PUBLIC_SERVER_PORT &&
  process.env.NEXT_PUBLIC_SERVER_API_VERSION &&
  process.env.NEXT_PUBLIC_AUTH0_DOMAIN &&
  process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID &&
  process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
);

export const SERVER_BASE_URL: string = process.env.NEXT_SERVER_URL! ?? "localhost";
export const SERVER_PORT: string = process.env.NEXT_SERVER_PORT! ?? "8081";
export const API_PREFIX: string = `/api/${process.env.NEXT_SERVER_API_VERSION! ?? "v1"}`;

export const AUTH0_DOMAIN: string = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
export const AUTH0_CLIENT_ID: string = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
export const AUTH0_CALLBACK_URL: string = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL!;
