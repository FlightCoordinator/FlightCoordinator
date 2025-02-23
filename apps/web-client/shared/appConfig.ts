"use client";

interface ConfigProps {
  ENVIRONMENT: string;
  SERVER: {
    BASE_URL: string;
    PORT: string;
    API_PREFIX: string;
  };
  AUTH: {
    SERVER_URL: string;
    CALLBACK_URL: string;
  };
}

export const hasEnvVars: boolean = !!(
  process.env.NEXT_PUBLIC_ENVIRONMENT &&
  process.env.NEXT_PUBLIC_SERVER_URL &&
  process.env.NEXT_PUBLIC_SERVER_PORT &&
  process.env.NEXT_PUBLIC_SERVER_API_VERSION &&
  process.env.NEXT_PUBLIC_AUTH_SERVER_URL &&
  process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL
);

export const config: ConfigProps = {
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT! ?? "dev",
  SERVER: {
    BASE_URL: process.env.NEXT_SERVER_URL! ?? "localhost",
    PORT: process.env.NEXT_SERVER_PORT! ?? "8081",
    API_PREFIX: `/api/${process.env.NEXT_SERVER_API_VERSION! ?? "v1"}`,
  },
  AUTH: {
    SERVER_URL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL!,
    CALLBACK_URL: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL!,
  },
};
