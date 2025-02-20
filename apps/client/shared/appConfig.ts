"use client";

interface ConfigProps {
  SERVER: {
    BASE_URL: string;
    PORT: string;
    API_PREFIX: string;
  };
  AUTH0: {
    DOMAIN: string;
    CLIENT_ID: string;
    CALLBACK_URL: string;
  };
}

export const hasEnvVars: boolean = !!(
  process.env.NEXT_PUBLIC_SERVER_URL &&
  process.env.NEXT_PUBLIC_SERVER_PORT &&
  process.env.NEXT_PUBLIC_SERVER_API_VERSION &&
  process.env.NEXT_PUBLIC_AUTH0_DOMAIN &&
  process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID &&
  process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL
);

export const config: ConfigProps = {
  SERVER: {
    BASE_URL: process.env.NEXT_SERVER_URL! ?? "localhost",
    PORT: process.env.NEXT_SERVER_PORT! ?? "8081",
    API_PREFIX: `/api/${process.env.NEXT_SERVER_API_VERSION! ?? "v1"}`,
  },
  AUTH0: {
    DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    CALLBACK_URL: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL!,
  },
};
