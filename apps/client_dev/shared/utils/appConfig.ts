export const SERVER_BASE_URL: string = process.env.NEXT_SERVER_URL!;
export const SERVER_PORT: string = process.env.NEXT_SERVER_PORT!;

const SERVER_API_VERSION: string = process.env.NEXT_SERVER_API_VERSION!;
export const API_PREFIX: string = `/api/${SERVER_API_VERSION}`;
