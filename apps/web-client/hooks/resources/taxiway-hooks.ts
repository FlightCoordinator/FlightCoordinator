import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useTaxiwaysQuery = () => {
  const taxiways = useQuery({
    queryKey: ["taxiwayQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Taxiway.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return taxiways;
};

const useTaxiwayCreateMutation = () => {
  const queryClient = useQueryClient();
  const createTaxiway = useMutation({
    mutationKey: ["createTaxiwayMutation"],
    mutationFn: async (taxiwayCreateData: ResourceTypes.Taxiway.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Taxiway.Mutations.CreateMutationParams>(
          taxiwayCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxiwayQuery"] }),
  });
  return createTaxiway;
};

const useTaxiwayUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateTaxiway = useMutation({
    mutationKey: ["updateTaxiwayMutation"],
    mutationFn: async (useTaxiwayUpdateData: ResourceTypes.Taxiway.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Taxiway.Mutations.UpdateMutationParams>(
          useTaxiwayUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxiwayQuery"] }),
  });
  return updateTaxiway;
};

const useTaxiwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteTaxiway = useMutation({
    mutationKey: ["deleteTaxiwayMutation"],
    mutationFn: async (taxiwayDeleteData: ResourceTypes.Taxiway.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Taxiway.Mutations.DeleteMutationParams>(
          taxiwayDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxiwayQuery"] }),
  });
  return deleteTaxiway;
};

export { useTaxiwaysQuery, useTaxiwayCreateMutation, useTaxiwayUpdateMutation, useTaxiwayDeleteMutation };
