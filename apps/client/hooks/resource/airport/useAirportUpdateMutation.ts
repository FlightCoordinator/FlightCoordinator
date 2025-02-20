"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useAirportUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateAirport = useMutation({
    mutationKey: ["updateAirportMutation"],
    mutationFn: async (airportUpdateData: ResourceTypes.Airport.Mutations.UpdateMutationParams) => {
      const { airportId, ...requestData } = airportUpdateData;
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "airport",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Airport.Mutations.UpdateMutationParams>({
          airportId: airportId,
          ...requestData,
        });
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["airportQuery"] }),
  });
  return updateAirport;
};

export default useAirportUpdateMutation;
