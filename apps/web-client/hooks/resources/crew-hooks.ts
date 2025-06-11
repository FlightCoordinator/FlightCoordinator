"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useCrewMembersQuery = () => {
  const crews = useQuery({
    queryKey: ["crewQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Crew.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return crews;
};

const useCrewCreateMutation = () => {
  const queryClient = useQueryClient();
  const createCrew = useMutation({
    mutationKey: ["createCrewtMutation"],
    mutationFn: async (crewCreateData: ResourceTypes.Crew.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Crew.Mutations.CreateMutationParams>(
          crewCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return createCrew;
};

const useCrewUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateCrew = useMutation({
    mutationKey: ["updateCrewMutation"],
    mutationFn: async (useCrewUpdateData: ResourceTypes.Crew.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Crew.Mutations.UpdateMutationParams>(
          useCrewUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return updateCrew;
};

const useCrewDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteCrew = useMutation({
    mutationKey: ["deleteCrewMutation"],
    mutationFn: async (crewDeleteData: ResourceTypes.Crew.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Crew.Mutations.DeleteMutationParams>(
          crewDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return deleteCrew;
};

export { useCrewMembersQuery, useCrewCreateMutation, useCrewUpdateMutation, useCrewDeleteMutation };
