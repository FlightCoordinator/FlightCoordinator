"use client";

import { useQuery } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { API_PREFIX, SERVER_BASE_URL, SERVER_PORT } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useAirportAllQuery = () => {
  const accessToken = useAccessToken();
  const airports = useQuery({
    queryKey: ["airportQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: SERVER_BASE_URL,
            port: Number(SERVER_PORT),
            endpoint: {
              prefix: API_PREFIX,
              controller: "airport",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Airport.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return airports;
};

export default useAirportAllQuery;
