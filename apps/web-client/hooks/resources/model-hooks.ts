import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useModelsQuery = () => {
  const models = useQuery({
    queryKey: ["modelQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Model.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return models;
};

const useModelCreateMutation = () => {
  const queryClient = useQueryClient();
  const createModel = useMutation({
    mutationKey: ["createModelMutation"],
    mutationFn: async (modelCreateData: ResourceTypes.Model.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Model.Mutations.CreateMutationParams>(
          modelCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modelQuery"] }),
  });
  return createModel;
};

const useModelUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateModel = useMutation({
    mutationKey: ["updateModelMutation"],
    mutationFn: async (useModelUpdateData: ResourceTypes.Model.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Model.Mutations.UpdateMutationParams>(
          useModelUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modelQuery"] }),
  });
  return updateModel;
};

const useModelDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteModel = useMutation({
    mutationKey: ["deleteModelMutation"],
    mutationFn: async (modelDeleteData: ResourceTypes.Model.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Model.Mutations.DeleteMutationParams>(
          modelDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modelQuery"] }),
  });
  return deleteModel;
};

export { useModelsQuery, useModelCreateMutation, useModelUpdateMutation, useModelDeleteMutation };
