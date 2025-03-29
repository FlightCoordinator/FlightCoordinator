interface ConfigProps {
  ENVIRONMENT: {
    CURRENT: string;
    IS_DEV: boolean;
  };
  DATA: {
    BASE_URL: string;
    PORT: string;
    API_PREFIX: string;
  };
  AUTH: {
    BASE_URL: string;
    PORT: string;
    API_PREFIX: string;
  };
}

export const hasEnvVars: boolean = !!(
  process.env.NEXT_PUBLIC_ENVIRONMENT &&
  process.env.NEXT_PUBLIC_DATA_SERVER_URL &&
  process.env.NEXT_PUBLIC_DATA_SERVER_PORT &&
  process.env.NEXT_PUBLIC_DATA_SERVER_API_VERSION &&
  process.env.NEXT_PUBLIC_AUTH_SERVER_URL &&
  process.env.NEXT_PUBLIC_AUTH_SERVER_PORT &&
  process.env.NEXT_PUBLIC_AUTH_SERVER_API_VERSION
);

export const config: ConfigProps = {
  ENVIRONMENT: {
    CURRENT: process.env.NEXT_PUBLIC_ENVIRONMENT! ?? "dev",
    IS_DEV: process.env.NEXT_PUBLIC_ENVIRONMENT! === "dev",
  },
  DATA: {
    BASE_URL: process.env.NEXT_PUBLIC_DATA_SERVER_URL! ?? "localhost",
    PORT: process.env.NEXT_PUBLIC_DATA_SERVER_PORT! ?? "8081",
    API_PREFIX: `/api/${process.env.NEXT_PUBLIC_DATA_SERVER_API_VERSION! ?? "v1"}`,
  },
  AUTH: {
    BASE_URL: process.env.NEXT_PUBLIC_AUTH_SERVER_URL! ?? "localhost",
    PORT: process.env.NEXT_PUBLIC_AUTH_SERVER_PORT! ?? "8082",
    API_PREFIX: `/api/${process.env.NEXT_PUBLIC_AUTH_SERVER_API_VERSION! ?? "v1"}`,
  },
};
