"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { API_PREFIX, SERVER_BASE_URL, SERVER_PORT } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useAirportCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createAirport = useMutation({
    mutationKey: ["createAirportMutation"],
    mutationFn: async (airportCreateData: ResourceTypes.Airport.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: SERVER_BASE_URL,
            port: Number(SERVER_PORT),
            endpoint: {
              prefix: API_PREFIX,
              controller: "airport",
              action: "create",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Airport.Mutations.CreateMutationParams>(
          airportCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["airportQuery"] }),
  });
  return createAirport;
};

export default useAirportCreateMutation;
