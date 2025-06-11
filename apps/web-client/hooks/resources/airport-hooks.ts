"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useAirportsQuery = () => {
  const airports = useQuery({
    queryKey: ["airportQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "airport",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Airport.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return airports;
};

const useAirportCreateMutation = () => {
  const queryClient = useQueryClient();
  const createAirport = useMutation({
    mutationKey: ["createAirportMutation"],
    mutationFn: async (airportCreateData: ResourceTypes.Airport.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "airport",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
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

const useAirportUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateAirport = useMutation({
    mutationKey: ["updateAirportMutation"],
    mutationFn: async (airportUpdateData: ResourceTypes.Airport.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "airport",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Airport.Mutations.UpdateMutationParams>(
          airportUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["airportQuery"] }),
  });
  return updateAirport;
};

const useAirportDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteAirport = useMutation({
    mutationKey: ["deleteAirportMutation"],
    mutationFn: async (airportDeleteData: ResourceTypes.Airport.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "airport",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
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

export { useAirportsQuery, useAirportCreateMutation, useAirportUpdateMutation, useAirportDeleteMutation };
