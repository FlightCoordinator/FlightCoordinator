"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useAirportDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteAirport = useMutation({
    mutationKey: ["deleteAirportMutation"],
    mutationFn: async (airportDeleteData: ResourceTypes.Airport.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "airport",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Airport.Mutations.DeleteMutationParams>(
          airportDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["airportQuery"] }),
  });
  return deleteAirport;
};

export default useAirportDeleteMutation;
