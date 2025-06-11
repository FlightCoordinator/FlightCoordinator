import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const usePlanesQuery = () => {
  const planes = useQuery({
    queryKey: ["planeQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Plane.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return planes;
};

const usePlaneCreateMutation = () => {
  const queryClient = useQueryClient();
  const createPlane = useMutation({
    mutationKey: ["createPlaneMutation"],
    mutationFn: async (planeCreateData: ResourceTypes.Plane.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.CreateMutationParams>(
          planeCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return createPlane;
};

const usePlaneUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updatePlane = useMutation({
    mutationKey: ["updatePlaneMutation"],
    mutationFn: async (usePlaneUpdateData: ResourceTypes.Plane.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.UpdateMutationParams>(
          usePlaneUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return updatePlane;
};

const usePlaneDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deletePlane = useMutation({
    mutationKey: ["deletePlaneMutation"],
    mutationFn: async (planeDeleteData: ResourceTypes.Plane.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.DeleteMutationParams>(
          planeDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return deletePlane;
};

export { usePlanesQuery, usePlaneCreateMutation, usePlaneUpdateMutation, usePlaneDeleteMutation };
