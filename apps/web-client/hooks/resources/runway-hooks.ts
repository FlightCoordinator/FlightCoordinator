import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useRunwaysQuery = () => {
  const runways = useQuery({
    queryKey: ["runwayQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Runway.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return runways;
};

const useRunwayCreateMutation = () => {
  const queryClient = useQueryClient();
  const createRunway = useMutation({
    mutationKey: ["createRunwayMutation"],
    mutationFn: async (runwayCreateData: ResourceTypes.Runway.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.CreateMutationParams>(
          runwayCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return createRunway;
};

const useRunwayUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateRunway = useMutation({
    mutationKey: ["updateRunwayMutation"],
    mutationFn: async (useRunwayUpdateData: ResourceTypes.Runway.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.UpdateMutationParams>(
          useRunwayUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return updateRunway;
};

const useRunwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteRunway = useMutation({
    mutationKey: ["deleteRunwayMutation"],
    mutationFn: async (runwayDeleteData: ResourceTypes.Runway.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.DeleteMutationParams>(
          runwayDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return deleteRunway;
};

export { useRunwaysQuery, useRunwayCreateMutation, useRunwayUpdateMutation, useRunwayDeleteMutation };
