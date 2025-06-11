import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useFlightsQuery = () => {
  const flights = useQuery({
    queryKey: ["flightQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Flight.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return flights;
};

const useFlightCreateMutation = () => {
  const queryClient = useQueryClient();
  const createFlight = useMutation({
    mutationKey: ["createFlightMutation"],
    mutationFn: async (flightCreateData: ResourceTypes.Flight.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.CreateMutationParams>(
          flightCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return createFlight;
};

const useFlightUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateFlight = useMutation({
    mutationKey: ["updateFlightMutation"],
    mutationFn: async (useFlightUpdateData: ResourceTypes.Flight.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "update",
            },
          },
          method: "PATCH",
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.UpdateMutationParams>(
          useFlightUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return updateFlight;
};

const useFlightDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteFlight = useMutation({
    mutationKey: ["deleteFlightMutation"],
    mutationFn: async (flightDeleteData: ResourceTypes.Flight.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.DeleteMutationParams>(
          flightDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return deleteFlight;
};

export { useFlightsQuery, useFlightCreateMutation, useFlightUpdateMutation, useFlightDeleteMutation };
